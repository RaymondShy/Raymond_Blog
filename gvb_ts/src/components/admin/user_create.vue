<script setup lang="ts">

import {IconCheckCircle, IconEmail, IconLock, IconPhone, IconUser, IconUserGroup} from "@arco-design/web-vue/es/icon";
import {reactive, ref} from "vue";
import {userCreateApi, type userCreateType} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";
const props = defineProps({
  visible:{
    type:Boolean
  },
  roleList:{
    type:Array,
  }
})
const emits = defineEmits(["update:visible","ok"]);
const formRef = ref()
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
    value:'0',
  },
  {
    label:'停用',
    value:'1',
  },
  {
    label:'异常',
    value:'2',
  }
]
const fieldNames = {value:'roleId',label:'roleName'}
/* form表单 */
const form = reactive<userCreateType&{re_password:string}&{avatar:string}>({
  userName:"",
  nickName:"",
  password:"",
  realName:"",
  gender:"1",
  tel:"",
  email:"",
  status:"0",
  re_password:"",
  avatar:"https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
  roleId:undefined
})
const defaultForm = {
  userName:"",
  nickName:"",
  password:"",
  realName:"",
  gender:"1",
  tel:"",
  email:"",
  status:"0",
  re_password:"",
  avatar:"https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
}
/* createUser 表单校验*/
const  createUser = async () => {
  let val = await formRef.value.validate()
  console.log(val)
  if (val) {
    return false
  }
  let res = await userCreateApi(form)
  console.log(res)
  if (res.code !== 200){
    if (res.code === 602){
      Message.warning(res.msg)
      return
    }
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("update:visible",false)
  emits("ok",true)
  Object.assign(form,defaultForm)
  return true
}
/* cancelUser 取消表单 */
const cancelUser = () =>{
  Object.assign(form,defaultForm)
  emits("update:visible",false)
  return true
}
//  密码校验
const rePasswordValidator = (value:string,callback:(error?:string) =>void):void=>{
  if(value !== form.password) return callback("确认密码不一致")
}
</script>

<template>
  <div>
    <a-modal title="创建用户" :visible="visible" :on-before-ok="createUser" :on-before-cancel="cancelUser" class="user-form-modal">
      <a-form ref="formRef" :model="form" :label-col-props="{ span: 6 }"
              :wrapper-col-props="{ span: 18 }" class="user-form">
        <a-form-item field="userName" label="用户名" :rules="[{required:true,message:'请输入用户名'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.userName" placeholder="请输入用户名" allow-clear>
            <template #prefix>
              <icon-user class="input-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="nickName" label="昵称" :rules="[{required:true,message:'请输入昵称'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.nickName" placeholder="请输入用户昵称" allow-clear>
            <template #prefix>
              <icon-user class="input-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="realName" label="真实姓名" :rules="[{required:true,message:'请输入真实姓名'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.realName" placeholder="请输入真实姓名" allow-clear>
            <template #prefix>
              <icon-user-group class="input-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="password" label="密码" :rules="[{required:true,message:'请输入密码'}]"
                     :validate-trigger="['blur']">
          <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear>
            <template #prefix>
              <icon-lock class="input-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item field="re_password" label="确认密码" :rules="[{required:true,message:'请确认密码'},{validator:rePasswordValidator}]"
                     :validate-trigger="['blur']">
          <a-input-password v-model="form.re_password" placeholder="请确认密码" allow-clear>
            <template #prefix>
              <icon-lock class="input-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item field="gender" label="性别" :rules="[{required:true,message:'请选择性别'}]"
                     :validate-trigger="['blur']">
          <a-radio-group v-model="form.gender" type="button">
            <a-radio v-for="item in genderStrings" :value="item.value">
              {{ item.label }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="tel" label="手机号" :rules="[{required:true,message:'请输入手机号'}]"
                     :validate-trigger="['blur']">
          <a-input placeholder="请输入手机号" v-model="form.tel" max-length="11" allow-clear>
            <template #prefix>
              <icon-phone class="input-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="email" label="邮箱">
          <a-input placeholder="请输入邮箱" v-model="form.email" type="email" allow-clear>
            <template #prefix>
              <icon-email class="input-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="status" label="状态" :rules="[{required:true,message:'请选择状态'}]"
                     :validate-trigger="['blur']">
          <a-select placeholder="请选择状态" disabled :options="statusOptions" v-model="form.status">
            <template #prefix>
              <icon-check-circle class="input-icon" />
            </template>
          </a-select>
        </a-form-item>
        <a-form-item field="roleId" label="角色" :rules="[{required:true,message:'请选择角色'}]"
                     :validate-trigger="['blur']">
          <a-select placeholder="请选择角色" :options="roleList" :field-names="fieldNames" v-model="form.roleId">
            <template #prefix>
              <icon-check-circle class="input-icon" />
            </template>
          </a-select>
        </a-form-item>

      </a-form>
    </a-modal>

  </div>
</template>

<style scoped>

</style>
