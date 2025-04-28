<template>
  <div class="gvb_table">
    <div class="gvb_table_head">
      <div class="action_create">
        <a-button type="primary">创建</a-button>
      </div>
      <div class="action_group"></div>
      <div class="action_search">
        <a-input-search placeholder="搜索"/>
      </div>
      <div class="action_other_search">
        <a-input-search placeholder="其他搜索"/>
      </div>
      <div class="action_filter">
        <a-select placeholder="过滤"/>
      </div>
      <div class="action_slot"></div>
      <div class="action_flush">
        <a-button><IconRefresh></IconRefresh></a-button>
      </div>
    </div>
    <div class="gvb_table_body">
      <div class="gvb_data_source">
        <a-table row-key="name" :columns="props.columns" :data="data.records" :row-selection="rowSelection"
                 v-model:selectedKeys="selectedKeys" :pagination="false">
          <template #columns>
            <template v-for="item in props.columns">
              <a-table-column v-if="item.render" :title="item.title as string">
                <template #cell="data">
                  <component :is="data.render"/>
                </template>
              </a-table-column>
              <a-table-column v-else-if="!item.slotName" :title="item.title as string"
                  :data-index="item.dataIndex"/>
              <a-table-column :title="item.title as string" v-else>
                <template #cell="{record}" v-if="item.slotName === 'action'">
                  <a-space>
                    <a-button type="primary">编辑</a-button>
                    <a-button type="primary" status="danger">删除</a-button>
                  </a-space>
                </template>
                <template #cell="{record}" v-else-if="item.slotName === 'status'">
                  <a-tag color="blue" v-if="record.status == 0">正常</a-tag>
                  <a-tag color="blue" v-else>异常</a-tag>
                </template>
                <template #cell="{record}" v-else-if="item.slotName === 'registerTime'">
                  <span>{{ relativeCurrentTime(record.registerTime) }}</span>
                </template>
                <template v-else #cell="{record}">
                  <slot :name="item.slotName" :record="record"></slot>
                </template>
              </a-table-column>
            </template>
          </template>
        </a-table>
      </div>
      <div class="gvb_page">
        <a-pagination :total="data.total" show-total show-jumper/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import {reactive, ref} from "vue";
import type {listResponse, paramsType} from "@/api";
import type {TableColumnData} from "@arco-design/web-vue/es/table/interface";
import type {userInfoType} from "@/api/user_api.ts";
import {relativeCurrentTime} from "../../utils/date.ts";
const selectedKeys = ref(['Jane Doe', 'Alisa Ross']);

interface Props{
  url: (params:paramsType)=> Promise<listResponse<any>>,
  columns:TableColumnData[]
}

const props = defineProps<Props>()
interface dataType{
  records: userInfoType[]
  total:number
}
const data = reactive<dataType>({
  records:[],
  total:0,
})

const getList = async () =>{
  let res = await props.url({})
  data.records  = res.data.records
  data.total = res.data.total
}
getList()
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

</script>

<style lang="scss" scoped>
.gvb_table{
  border-radius: 5px;
  background-color: var(--color-bg-1);
  .gvb_table_head{
    padding: 20px 20px 10px 20px;
    border-bottom: 1px solid var(--bg);
    display: flex;
    align-items: center;
    position: relative;
    > div{
      margin-right: 10px;
    }
    .action_flush{
      position: absolute;
      right: 20px;
      button{
        padding: 10px;
      }
    }
  }
  .gvb_table_body{
    padding: 10px 20px 10px 20px;
    .gvb_data_source{

    }
    .gvb_page{
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
