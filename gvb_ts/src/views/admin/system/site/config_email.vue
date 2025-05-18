<script setup lang="ts">

import Gvb_title from "@/components/admin/gvb_title.vue";
import {reactive, ref} from "vue";
import type {emailType} from "@/api/settings_api.ts";
const formRef = ref()
const emailForm = reactive<emailType>({
  host:"",
  port:553,
  username:"",
  password:"",
  protocol:"",
  auth:true,
  useTls:true,
  connectionTimeout:5000,
  writeTimeout:5000,
})
</script>

<template>
<div class="config_email">
  <div class="left">
    <div class="site_info">
      <gvb_title title="邮箱配置"/>
      <a-alert style="margin-top: 20px">配置邮箱之后，系统配置会通知到你的邮箱，不配置则不通知</a-alert>
      <a-form :model="emailForm" ref="formRef" :label-col-props="{span:4}" :wrapper-col-props="{span:20}">
        <a-form-item label="邮箱域名" field="host" :rules="[{required:true,message:'请输入邮箱域名'}]"   :validate-trigger="['blur']">
          <a-input placeholder="请输入邮箱域名" v-model="emailForm.host" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="邮箱端口" field="port" :rules="[{required:true,message:'请输入邮箱端口'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入邮箱端口" v-model="emailForm.port" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="发信邮箱" field="username" :rules="[{required:true,message:'请输入发信邮箱'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入发信邮箱" v-model="emailForm.username" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="密码" field="password" :rules="[{required:true,message:'请输入密码'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入密码" v-model="emailForm.password" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="连接超时" field="connectionTimeout" :rules="[{required:true,message:'请输入连接超时时间'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入连接超时时间" v-model="emailForm.connectionTimeout" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="读取超时" field="writeTimeout" :rules="[{required:true,message:'请输入读取超时时间'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入读取超时时间" v-model="emailForm.writeTimeout" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="是否认证" field="auth" :rules="[{required:true,message:'请输入认证'}]" :validate-trigger="['blur']">
          <a-switch v-model="emailForm.auth" />
        </a-form-item>
        <a-form-item label="TLS" field="useTls" :rules="[{ required: true, message: '请输入TLS' }]">
          <a-switch v-model="emailForm.useTls" />
        </a-form-item>
      </a-form>
      <a-button type="primary">更新</a-button>
    </div>
  </div>
  <div class="right"></div>
</div>
</template>

<style scoped lang="scss">
.config_email {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding-bottom: 60px; /* 为底部按钮留出空间 */

  .left {
    width: 50%;
    padding-right: 12px;
    .arco-form{
      margin-top: 20px;
    }
  }
}
</style>
