<template>
  <div>
    <gvb_table :url="getUserList" :columns="columns"/>
  </div>
</template>

<script setup lang="ts">
import Gvb_table from "@/components/admin/gvb_table.vue";
import {getUserList} from "@/api/user_api.ts";

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
    dataIndex: 'registerTime',
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
</script>

<style scoped>

</style>
