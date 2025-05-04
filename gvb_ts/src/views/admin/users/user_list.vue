<template>
  <div>
    <a-modal title="创建用户" v-model:visible="visible" :on-before-ok="createUser">
      <a-form ref="formRef" :model="form" :label-col-props="{ span: 5 }"
              :wrapper-col-props="{ span: 19  }">
        <a-form-item field="userName" label="用户名" :rules="[{required:true,message:'请输入用户名'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.userName" placeholder="请输入用户名"/>
        </a-form-item>
        <a-form-item field="realName" label="真实姓名" :rules="[{required:true,message:'请输入真实姓名'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.realName" placeholder="请输入真实姓名" />
        </a-form-item>
        <a-form-item field="gender" label="性别" :rules="[{required:true,message:'请选择性别'}]"
                     :validate-trigger="['blur']">
          <a-radio-group>
            <a-radio v-for="item in genderStrings" v-model="form.gender" :value="item.value">{{item.label}}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="mobile" label="手机号" :rules="[{required:true,message:'请输入手机号'}]"
                     :validate-trigger="['blur']">
          <a-input placeholder="请输入手机号" v-model="form.mobile" max-length="11"/>
        </a-form-item>
        <a-form-item field="email" label="邮箱">
          <a-input placeholder="请输入邮箱" v-model="form.email" type="email"/>
        </a-form-item>
        <a-form-item field="status" label="状态" :rules="[{required:true,message:'请选择状态'}]"
                     :validate-trigger="['blur']">
          <a-select placeholder="请选择状态" disabled :options="statusOptions" v-model="form.status"/>
        </a-form-item>

      </a-form>
    </a-modal>
    <gvb_table :url="getUserList" :columns="columns"
               :page-size="8" add-label="创建用户"
               default-delete
               @add="visible = true" @remove="remove" @edit="edit"
               :action-group-options="actionGroupOptions">
      <template #avatar="{record}">
        <a-avatar :image-url="record.avatar"/>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">
import Gvb_table from "@/components/admin/gvb_table.vue";
import {getUserList, type userCreateType, type userInfoType} from "@/api/user_api.ts";
import type {optionType} from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
const visible = ref(false)
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

const formRef = ref()
/* form表单 */
const form = reactive<userCreateType&{re_password:string}>({
  userName:"",
  password:"",
  realName:"",
  gender:"1",
  mobile:"",
  email:"",
  status:"1",
  re_password:""
})
// 性别组
const genderStrings = reactive([
    {
    label:'男',
    value:'0',
    },
      {
        label:'女生',
        value:'1',
      },
      {
        label: '不愿透露',
        value:'2',
      }
]
)
// 状态组
const statusOptions = [
  {
    label:'正常',
    value:'1',
  },
  {
    label:'停用',
    value:'2',
  },
  {
    label:'异常',
    value:'3',
  }
]
/* createUser 表单校验*/
const  createUser = async () => {
  let val = await formRef.value.validate
  console.log(val)
  if (val) return false
  return true
}
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
