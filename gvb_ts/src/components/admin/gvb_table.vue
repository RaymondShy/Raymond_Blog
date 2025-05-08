<template>
  <div class="gvb_table">
    <div class="gvb_table_header">
      <div class="header_actions">
                <a-dropdown trigger="hover" class="export-dropdown">
                  <a-button type="outline">
                    <template #icon><icon-export /></template>
                    <span class="btn-text">导出</span>
                  </a-button>
                  <template #content>
                  <a-doption @click="">CSV格式</a-doption>
                   <a-doption @click="">Excel格式</a-doption>
                  </template>
                </a-dropdown>
        <a-button type="primary" @click="add" class="create-btn">
          <template #icon><icon-plus /></template>
          {{addLabel}}
        </a-button>
        <a-button @click="flush" class="refresh-btn">
          <template #icon><icon-refresh /></template>
        </a-button>
      </div>
    </div>

    <div class="gvb_table_filters">
      <div class="filter_group">
        <div class="search_box">
          <a-input-search
              v-model="params.key"
              @keydown.enter="search"
              placeholder="搜索内容..."
              @search="search"
              class="search-input"
          >
            <template #prefix>
              <icon-search />
            </template>
          </a-input-search>
        </div>

        <div class="action_group" v-if="!noActionGroup">
          <a-space>
            <span class="action_label">批量操作</span>
            <a-select
                style="width: 140px"
                :options="actionGroup"
                v-model="currentAction"
                allow-clear
                placeholder="选择操作"
                class="action-select"
            >
              <template #prefix>
                <icon-apps />
              </template>
            </a-select>
            <a-button
                type="primary"
                status="danger"
                @click="actionMethod"
                v-if="currentAction !== undefined"
                class="action-btn"
            >
              <template #icon><icon-play-arrow /></template>
              执行
            </a-button>
          </a-space>
        </div>

        <div class="filter_selectors" v-if="filterGroup.length">
          <a-select
              v-for="item in filterGroup"
              :key="item.value"
              :placeholder="item.label"
              style="width: 150px"
              @change="filterChange(item,$event)"
              :options="item.options"
              class="filter-select"
          >
            <template #prefix>
              <icon-filter />
            </template>
          </a-select>
        </div>

        <slot name="action_other_search"></slot>
      </div>

      <div class="filter_buttons">
        <a-button type="primary" @click="search">搜索</a-button>
        <a-button @click="resetFilters">重置</a-button>
      </div>
    </div>

    <div class="gvb_table_container">
      <a-table
          :row-key="rowKey"
          :columns="props.columns"
          :data="data.records"
          :row-selection="props.noCheck ? undefined: rowSelection"
          v-model:selectedKeys="selectedKeys"
          :pagination="false"
          size="mini"
          class="data-table"
          :bordered="false"
          :loading="loading"
      >
        <template #columns>
          <template v-for="item in props.columns">
            <a-table-column v-if="item.render" :title="item.title as string">
              <template #cell="data">
                <component :is="data.render(data) as Component"/>
              </template>
            </a-table-column>
            <a-table-column v-else-if="!item.slotName"
                            :title="item.title as string"
                            :data-index="item.dataIndex"/>
            <a-table-column :title="item.title as string" v-else>
              <template #cell="{record}" v-if="item.slotName === 'action'">
                <a-space>
                  <a-button type="primary" @click="edit(record)" class="action-btn">
                    <template #icon><icon-edit /></template>
                    编辑
                  </a-button>
                  <a-popconfirm content="确定要删除吗？" @ok="remove(record)" class="delete-popconfirm">
                    <a-button type="primary" status="danger" class="action-btn">
                      <template #icon><icon-delete /></template>
                      删除
                    </a-button>
                  </a-popconfirm>
                </a-space>
              </template>
              <template #cell="{record}" v-else-if="item.slotName === 'status'">
                <a-tag :color="getStatusColor(record.status)" class="status-tag">
                  {{ getStatusText(record.status) }}
                </a-tag>
              </template>
              <template #cell="{record}" v-else-if="item.slotName === 'registerTime'">
                <span class="time-text">{{ relativeCurrentTime(record.registerTime) }}</span>
              </template>
              <template #cell="{record}" v-else-if="item.slotName === 'createTime'">
                <span class="time-text">{{ relativeCurrentTime(record.createTime) }}</span>
              </template>
              <template v-else #cell="{record}">
                <slot :name="item.slotName" :record="record"></slot>
              </template>
            </a-table-column>
          </template>
        </template>
      </a-table>
    </div>

    <div class="gvb_table_footer">
      <div class="selected_count" v-if="selectedKeys.length > 0">
        已选 {{selectedKeys.length}} 项
      </div>
      <a-pagination
          v-if="!props.noPage"
          :total="data.total"
          @change="pageChange"
          v-model:current="params.pageNum"
          :default-page-size="params.pageSize"
          show-total
          show-jumper
          class="pagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconRefresh, IconPlus, IconSearch, IconApps, IconPlayArrow, IconFilter, IconEdit, IconExport, IconDelete} from "@arco-design/web-vue/es/icon";
import {type Component, reactive, ref} from "vue";
import type {baseResponse, listDataType, paramsType} from "@/api";
import type {TableColumnData, TableData} from "@arco-design/web-vue/es/table/interface";
import {defaultDeleteApi, type userInfoType} from "@/api/user_api.ts";
import {relativeCurrentTime} from "../../utils/date.ts";
import {Message} from "@arco-design/web-vue";

const selectedKeys = ref<number[] | string[]>([]);
const loading = ref(false);

const emits = defineEmits(["add","edit","remove"])

interface Props{
  url: (params:paramsType)=> Promise<baseResponse<listDataType<any>>>,
  columns:TableColumnData[],
  pageSize?:number,
  rowKey?:string,
  addLabel?:string,
  defaultDelete?:boolean,
  noActionGroup?:boolean, // 不启用操作组
  actionGroupOptions?:optionType[],
  noCheck?:boolean,
  noPage?:boolean,
}

const props = defineProps<Props>()
const data = reactive<listDataType<any>>({
  records:[],
  total:0,
})

/* 默认值设置 */
const {pageSize = 10, rowKey = 'userId', addLabel = '添加'} = props

/* 搜索参数 */
const params = reactive<paramsType>({
  key:'',
  pageNum:1,
  pageSize:props.pageSize,
})

const getList = async () => {
  loading.value = true;
  try {
    let res = await props.url(params)
    data.records = res.data.records
    data.total = res.data.total
  } finally {
    loading.value = false;
  }
}

const currentAction = ref<string | number | undefined>(undefined)

/* 操作组执行按钮 */
const actionMethod = async () => {
  if(currentAction.value === 0){
    if (selectedKeys.value.length === 0){
      Message.warning("请选择要删除的内容")
      return
    }
    let res = await defaultDeleteApi(selectedKeys.value as number[])
    if (res.code !== 200){
      Message.error("删除失败")
      return
    }
    Message.success("删除成功")
    getList()
    return
  }
  const action = actionGroup.value[currentAction.value as number];
  if (!action.callback){
    return;
  }
  action.callback(selectedKeys.value).then(res => {
    if (res){
      selectedKeys.value = []
      getList();
    }
  })
}

/* 操作组类型 */
export interface optionType{
  label:string
  value?:number | string
  callback?:(value:(number|string)[]) => Promise<boolean>
}

/* 操作组 */
const actionGroup = ref<optionType[]>([
  {label:'批量删除', value: 0}
])

const pageChange = () => {
  getList()
}

getList()

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

/* 搜索 */
const search = () => {
  params.pageNum = 1;
  getList()
}

/* 重置 */
const resetFilters = () => {
  params.key = '';
  params.pageNum = 1;
  getList()
}

/* 刷新 */
const flush = () => {
  Message.success('刷新成功')
  params.pageNum = 1;
  getList()
}

/* 新增 */
const add = () => {
  emits("add")
}

/* 修改 */
const edit = (record: TableData) => {
  emits("edit", record)
}

/* 删除 */
const remove = async (record: TableData) => {
  let id = record[rowKey]
  if (props.defaultDelete){ // 启用默认删除
    let res = await defaultDeleteApi([id])
    if (res.code !== 200){
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
    getList()
    return;
  }
  emits("remove", [id])
}

/* 初始化操作组 */
const initActionGroupOptions = () => {
  if (!props.actionGroupOptions) return;
  for (let i = 0; i < props.actionGroupOptions.length; i++) {
    actionGroup.value.push({
      label: props.actionGroupOptions[i].label,
      value: i + 1,
      callback: props.actionGroupOptions[i].callback
    })
  }
}
initActionGroupOptions()

/* 过滤组 */
const filterGroup = ref([
  {
    label:'角色过滤',
    value:0,
    column:"role",
    options:[
      {
        label:'管理员',
        value:1
      }
    ]
  },
  {
    label:'ip过滤',
    value:1,
    column:"ip",
    options:[
      {
        label:'192.168.66.9',
        value:1
      }
    ]
  },
])

/* 过滤事件 */
const filterChange = (item:any, val:any) => {
  console.log(item, val)
}

// 添加状态颜色和文本映射
const getStatusColor = (status: number) => {
  const statusMap: Record<number, string> = {
    0: 'green',
    1: 'red'
  };
  return statusMap[status] || 'gray';
};

const getStatusText = (status: number) => {
  const statusMap: Record<number, string> = {
    0: '正常',
    1: '异常'
  };
  return statusMap[status] || '未知';
};
defineExpose({
  getList
})
</script>

<style lang="scss" scoped>
.gvb_table {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-bg-1);
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.gvb_table_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg-2);

  .gvb_table_title {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-1);
  }

  .header_actions {
    display: flex;
    gap: 12px;

    .create-btn {
      padding: 0 16px;
      height: 36px;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(var(--primary-6), 0.2);
      }
    }

    .refresh-btn {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      transition: all 0.3s ease;

      &:hover {
        transform: rotate(180deg);
      }
    }
  }
}

.gvb_table_filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg-2);
  flex-wrap: wrap;
  gap: 16px;

  .filter_group {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    flex: 1;

    .search_box {
      min-width: 240px;
      max-width: 320px;

      .search-input {
        border-radius: 6px;
        transition: all 0.2s ease;

        &:hover, &:focus-within {
          border-color: rgb(var(--primary-6));
          box-shadow: 0 0 0 2px rgba(var(--primary-6), 0.1);
        }
      }
    }

    .action_group {
      .action_label {
        color: var(--color-text-2);
        font-size: 14px;
      }

      .action-select {
        border-radius: 6px;
        margin: 0 8px;
      }

      .action-btn {
        border-radius: 6px;
        transition: all 0.2s ease;

        &:hover {
          transform: translateY(-1px);
        }
      }
    }

    .filter_selectors {
      display: flex;
      gap: 12px;

      .filter-select {
        border-radius: 6px;
      }
    }
  }

  .filter_buttons {
    display: flex;
    gap: 12px;

    button {
      border-radius: 6px;
      height: 36px;
      padding: 0 16px;
    }
  }
}

.gvb_table_container {
  flex: 1;
  overflow: auto;
  padding: 0 16px;

  .data-table {
    :deep(.arco-table-th) {
      background-color: var(--color-bg-2);
      font-weight: 500;
      color: var(--color-text-1);
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-border);
    }

    :deep(.arco-table-tr) {
      transition: all 0.2s ease;

      &:hover {
        background-color: var(--color-fill-2);
      }
    }

    :deep(.arco-table-td) {
      padding: 12px 16px;
      color: var(--color-text-2);
      font-size: 14px;
      border-bottom: 1px solid var(--color-border);
    }

    :deep(.arco-table-checkbox) {
      padding: 0 8px;
    }

    :deep(.arco-table-cell) {
      padding: 0;
    }

    :deep(.arco-table-expand-btn) {
      color: var(--color-text-3);
      transition: all 0.2s ease;

      &:hover {
        color: rgb(var(--primary-6));
      }
    }
  }
}

.gvb_table_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-bg-2);

  .selected_count {
    font-size: 14px;
    color: var(--color-text-2);
  }

  .pagination {
    :deep(.arco-pagination-item) {
      border-radius: 6px;
      transition: all 0.2s ease;
      margin: 0 4px;

      &:hover {
        background-color: var(--color-fill-2);
      }

      &.arco-pagination-item-active {
        background-color: rgb(var(--primary-6));
        color: white;

        &:hover {
          background-color: rgb(var(--primary-5));
        }
      }
    }

    :deep(.arco-pagination-jumper) {
      margin-left: 16px;

      input {
        border-radius: 6px;
        transition: all 0.2s ease;

        &:hover, &:focus {
          border-color: rgb(var(--primary-6));
          box-shadow: 0 0 0 2px rgba(var(--primary-6), 0.1);
        }
      }
    }
  }
}

.status-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
  }
}

.time-text {
  color: var(--color-text-2);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  height: 32px;
  font-size: 14px;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    transform: translateY(-1px);
  }
}

.delete-popconfirm {
  :deep(.arco-popconfirm-content) {
    padding: 12px 16px;
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  :deep(.arco-popconfirm-title) {
    font-weight: 500;
    margin-bottom: 8px;
  }
}

@media (max-width: 768px) {
  .gvb_table_filters {
    flex-direction: column;
    align-items: stretch;

    .filter_group {
      flex-direction: column;
      align-items: stretch;

      .search_box {
        max-width: 100%;
      }
    }

    .filter_buttons {
      width: 100%;
      justify-content: flex-end;
    }
  }

  .gvb_table_footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;

    .pagination {
      justify-content: center;
    }
  }
}
</style>
