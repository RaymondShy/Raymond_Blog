<template>
  <div class="gvb_table">
    <div class="gvb_table_head">
      <div class="action_create">
        <a-button type="primary" @click="add">{{addLabel}}</a-button>
      </div>
      <div class="action_search">
        <a-input-search v-model="params.key" @keydown.enter="search" placeholder="搜索" @search="search"></a-input-search>
      </div>
      <div class="action_group"  v-if="!noActionGroup">
        <a-space>
          <a-select style="width: 100px" :options="actionGroup" v-model="currentAction" allow-clear  placeholder="操作组"/>
          <a-button type="primary" status="danger" @click="actionMethod" v-if="currentAction !== undefined">执行</a-button>
        </a-space>
      </div>
      <div class="action_other_search">
        <a-input-search placeholder="其他搜索"/>
      </div>
      <div class="action_filter">
        <a-select placeholder="过滤"/>
      </div>
      <div class="action_slot"></div>
      <div class="action_flush" @click="flush">
        <a-button><IconRefresh></IconRefresh></a-button>
      </div>
    </div>
    <div class="gvb_table_body">
      <div class="gvb_data_source">
        <a-table :row-key=rowKey :columns="props.columns" :data="data.records" :row-selection="props.noCheck ? undefined: rowSelection"
                 v-model:selectedKeys="selectedKeys"  :pagination="false">
          <template #columns>
            <template v-for="item in props.columns">
              <a-table-column v-if="item.render" :title="item.title as string">
                <template #cell="data">
                  <component :is="data.render(data) as Component"/>
                </template>
              </a-table-column>
              <a-table-column v-else-if="!item.slotName" :title="item.title as string"
                  :data-index="item.dataIndex"/>
              <a-table-column :title="item.title as string" v-else>
                <template #cell="{record}" v-if="item.slotName === 'action'">
                  <a-space>
                    <a-button type="primary" @click="edit(record)">编辑</a-button>
                    <a-popconfirm content="Are you sure you want to delete?" @ok="remove(record)">
                      <a-button type="primary" status="danger">删除</a-button>
                    </a-popconfirm>
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
        <a-pagination :total="data.total" @change="pageChange"
                      v-model:current="params.pageNum" :default-page-size="params.pageSize"
                      show-total show-jumper/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import {type Component, reactive, ref} from "vue";
import type {baseResponse, listDataType, paramsType} from "@/api";
import type {TableColumnData, TableData} from "@arco-design/web-vue/es/table/interface";
import {defaultDeleteApi, type userInfoType} from "@/api/user_api.ts";
import {relativeCurrentTime} from "../../utils/date.ts";
import {Message} from "@arco-design/web-vue";
const selectedKeys = ref<number[] | string[]>([]);

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
}

const props = defineProps<Props>()
const data = reactive<listDataType<any>>({
  records:[],
  total:0,
})
/* 默认值设置 */
const {pageSize = 10,rowKey = 'userId',addLabel='添加'} = props
interface dataType{
  records: userInfoType[]
  total:number
}

/* 搜索参数 */
const params = reactive<paramsType>({
  key:'',
  pageNum:1,
  pageSize:props.pageSize,
})
const getList = async () =>{
  let res = await props.url(params)
  data.records  = res.data.records
  data.total = res.data.total
}
const currentAction = ref<string | number | undefined>(undefined)
/* 操作组执行按钮 */
const actionMethod = async ()=>{
    console.log(selectedKeys.value)
  if(currentAction.value === 0){
    if (selectedKeys.value.length === 0){
      Message.warning("Please select the content to be deleted")
      return
    }
    let res = await defaultDeleteApi(selectedKeys.value as number[])
    if (res.code !== 200){
      Message.error("Delete failed")
      return
    }
    Message.success("Deleted successfully")
    getList()
    return
  }
  const action = actionGroup.value[currentAction.value as number];
  if (!action.callback){
    return;
  }
  action.callback(selectedKeys.value).then(res =>{
    if (res){
      selectedKeys.value = []
      getList();
      return
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
  {label:'批量删除',value:0}
])

const pageChange = () =>{
  getList()
}
getList()
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

/* 搜索 */
const search = () =>{
  // 页数归一
  params.pageNum = 1;
  getList()
}

/* 刷新 */
const flush = () =>{
  Message.success('刷新成功')
  params.pageNum = 1;
  getList()
}
/* 新增 */
const add = () =>{
  emits("add")
}
/* 修改 */
const edit = (record: TableData) =>{
  emits("edit",record)
}
/* 删除 */
const remove = async (record: TableData) =>{
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
  emits("remove",[id])
}
/* 初始化操作组 */
const initActionGroupOptions = () =>{
  if (!props.actionGroupOptions) return;
  for (let i = 0; i < props.actionGroupOptions.length; i++) {
    actionGroup.value.push({
      label:props.actionGroupOptions[i].label,
      value: i +1,
      callback: props.actionGroupOptions[i].callback
    })
  }
}
initActionGroupOptions()
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
    .action_group{
      display: flex;
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
