<template>
  <div>
    <gvb_table :url="getUserList" :columns="columns"
               :page-size="8" add-label="创建用户"
               default-delete
               @add="add" @remove="remove" @edit="edit"
               :action-group-options="actionGroupOptions">
      <template #avatar="{record}">
        <a-avatar :image-url="record.avatar"/>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">
import Gvb_table from "@/components/admin/gvb_table.vue";
import {getUserList, type userInfoType} from "@/api/user_api.ts";
import type {optionType} from "@/components/admin/gvb_table.vue";

const columns = [
  {
    title: '昵称',
    dataIndex: 'nickName',
  },
  {
    title: '头像',
    slotName: 'avatar',
  },
  {
    title: '登录IP',
    dataIndex: 'loginIp',
  },
  {
    title: '注册时间',
    slotName: 'registerTime',
  },

  {
    title: '电话号',
    dataIndex: 'tel',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  // {
  //   title: '个人博客地址',
  //   dataIndex: 'website',
  // },
  {
    title: '状态',
    slotName: 'status',
  },
  {
    title: '简介',
    dataIndex: 'bio',
  },
  {
    title:'操作',
    slotName:'action'
  }
]
/* 操作组 */
const actionGroupOptions:optionType[] = [
  {label:'批量拉黑',callback: async (idList:(number|string)[]):Promise<boolean> =>{
    return true;
  }}
]
/* 新增 */
const add = (record:userInfoType) =>{
  console.log('add',record)
}
/* 修改 */
const edit = (record:userInfoType) =>{
  console.log(record)
}
/* 删除 */
const remove = (idList: number[]) =>{
  console.log(idList)
}
</script>

<style scoped>

</style>
