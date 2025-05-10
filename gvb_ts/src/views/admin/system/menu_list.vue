<script setup lang="ts">

import Gvb_table from "@/components/admin/gvb_table.vue";
import {getMenuList, type menuType} from "@/api/menu_api.ts";
import {ref} from "vue";
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
const edit = (record:menuType) =>{}
const gvbTable = ref()
const okSuccess = () =>{
  gvbTable.value.getList()
}
</script>

<template>
  <div >
    <gvb_bread_crumb/>
    <menu_create v-model:visible="visible" @ok="okSuccess"/>
    <div class="gvb_menu">
      <gvb_table :url="getMenuList" :columns="columns"
                 :page-size="8" add-label="创建菜单"
                 default-delete
                 no-action-group
                 no-check
                 @add="visible = true" @edit="edit"
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
