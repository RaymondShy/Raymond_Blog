<script setup lang="ts">

import Gvb_table from "@/components/admin/gvb_table.vue";
import {getMenuList, type menuCreateRequest, type menuType} from "@/api/menu_api.ts";
import {reactive, ref} from "vue";
import Gvb_bread_crumb from "@/components/admin/gvb_bread_crumb.vue";
import Menu_create from "@/components/admin/menu_create.vue";
const columns = [
  {
    title: '首页标题',
    dataIndex: 'menuName',
  },
  {
    title: '路径',
    dataIndex: 'menuUrl',
  },
  {
    title: 'slogan',
    dataIndex: 'slogan',
  },
  // {
  //   title: '简介',
  //   dataIndex: 'menuAbstract',
  // },
  {
    title: '简介切换时间',
    dataIndex: 'abstractT',
  },
  {
    title: 'carousel',
    slotName: 'carouselList',
  },
  {
    title: '创建时间',
    slotName: 'createTime',
  },
  {
    title:'操作',
    slotName:'action'
  }
]
const visible = ref(false)
const gvbTable = ref()
const okSuccess = () =>{
  gvbTable.value.getList()
}
const defaultMenuForm = reactive<menuCreateRequest>({
  menuName:'',
  slogan:'',
  menuAbstract:'',
  menuOrderNum:0,
  abstractT:7,
  status:'',
  menuUrl:'',
  idList:[],
})
const recordData = reactive<menuCreateRequest>({
  menuName:'',
  slogan:'',
  menuAbstract:'',
  menuOrderNum:0,
  abstractT:7,
  status:'',
  menuUrl:'',
  idList:[],
  menuId:0
})

/* 编辑菜单 */
const edit = (record:menuCreateRequest)=>{
  Object.assign(recordData,record)
  title.value = '修改菜单'
  console.log(recordData)
  visible.value = true
}
const title = ref('')
/* 新增菜单 */
const add = () =>{
  Object.assign(recordData,defaultMenuForm)
  recordData.menuId = 0
  title.value = ''
  console.log(recordData)
  visible.value = true
}
</script>

<template>
  <div >
    <gvb_bread_crumb/>
    <menu_create :title="title" v-model:visible="visible" @ok="okSuccess" :record="recordData"/>
    <div class="gvb_menu">
      <gvb_table :url="getMenuList" :columns="columns"
                 :page-size="8" add-label="创建菜单"
                 default-delete
                 no-action-group
                 no-check
                 @add="add" @edit="edit"
                 @remove="remove"
                 ref="gvbTable">
        <template #carouselList="{record}:{record:menuType}">
          <div class="menu_column_view">
            <a-image v-for="item in record.carouselList"
                     height="30"
                     :key="item.carouselId"
                     :src="item.imageUrl"
            />
          </div>
        </template>
      </gvb_table>
    </div>

  </div>
</template>

<style scoped lang="scss">
.gvb_menu{
  min-height: 100%;
  padding: 16px 20px;
  background-color: var(--color-bg-2);
  .menu_column_view{
    display: grid;
    grid-template-columns: repeat(3 , 1fr);
    grid-row-gap: 5px;
  }
}
</style>
