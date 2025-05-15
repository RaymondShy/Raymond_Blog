<script setup lang="ts">

import Gvb_bread_crumb from "@/components/admin/gvb_bread_crumb.vue";
import Gvb_table from "@/components/admin/gvb_table.vue";
import {getPromotionApi, type promotionType} from "@/api/carousel_api.ts";
import Promotion_create from "@/components/admin/promotion_create.vue";
import {reactive, ref} from "vue";
const columns = [
      {
        title: '图片标题',
        dataIndex: 'carouselTitle',
      },
      {
        title: '图片',
        slotName: 'imageUrl',
      },
      {
        title: '跳转链接',
        slotName: 'linkUrl',
      },
      {
        title: '推广切换时间',
        dataIndex: 'carouselTime',
      },
      {
        title: '排序',
        dataIndex: 'sortOrderNum',
      },
      {
        title: '状态',
        slotName: 'status',
      },
      {
        title:'更新时间',
        slotName:'updateTime'
      },
      {
        title:'操作',
        slotName:'action'
      }
]
const defaultPromotionForm:promotionType = {
  carouselId:undefined,
  imageUrl:"",
  carouselTitle:"",
  linkUrl:"",
  sortOrderNum:0,
  status:"",
  carouselTime:0,
};
const title = ref("")
const add = ()=>{
  Object.assign(recordData,defaultPromotionForm);
  title.value = "创建推广"
  visible.value = true
}
const edit = (record:promotionType)=>{
  Object.assign(recordData,record)
  title.value = "修改推广"
  visible.value = true
}
const remove = () =>{}
const recordData = reactive<promotionType>({
  carouselId:0,
  imageUrl:"",
  carouselTitle:"",
  linkUrl:"",
  sortOrderNum:0,
  status:"",
  carouselTime:0
})
const visible = ref(false)
const gvbTable = ref()
</script>

<template>
  <div>
    <gvb_bread_crumb/>
    <promotion_create :title="title" v-model:visible="visible" :record="recordData" @ok="gvbTable.getList()"/>
    <div class="gvb_promotion_list">
      <gvb_table :url="getPromotionApi" :columns="columns"
                 :page-size="8" add-label="创建推广"
                 default-delete
                 no-action-group
                 no-check
                 @add="add" @edit="edit"
                 @remove="remove"
                 ref="gvbTable">
        <template #imageUrl="{record}:{record:promotionType}">
          <div class="menu_column_view">
            <a-image :src="record.imageUrl"
                     height="80" width="130"/>
          </div>
        </template>
        <template #linkUrl="{record}:{record:promotionType}">
          <a-link :href="record.linkUrl" target="_blank">{{record.linkUrl}}</a-link>
        </template>
      </gvb_table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gvb_promotion_list{
  min-height: 100%;
  padding: 16px 20px;
  background-color: var(--color-bg-2);
}
</style>
