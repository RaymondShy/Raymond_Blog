<script setup lang="ts">

import Gvb_title from "@/components/admin/gvb_title.vue";
import {reactive, ref} from "vue";
import {type emailType, getEmailConfig} from "@/api/settings_api.ts";
import Gvb_help from "@/components/admin/gvb_help.vue";
const formRef = ref()
const emailForm = reactive<emailType>({
  host:"",
  port:553,
  username:"",
  password:"",
  protocol:"",
  auth:true,
  nickname:"",
  ssl:{
    enable:true
  },
  startTls:{
    enable:true,
  },
  connectionTimeout:5000,
  writeTimeout:5000,
})
const getEmail = async () => {
  let res = await getEmailConfig()
  Object.assign(emailForm, res.data)
}
const helpList = [
  {
    title:'邮箱域名，邮箱端口',
    abs:'每个邮件服务的smtp域名和端口不同，请仔细检查',
    content:`参考链接：<a href="http://www.codecify.com/doc_/config_document">http://www.codecify.com/doc_/config_document  </a>`
  },
  {
    title:'发信邮箱与密码',
    abs:'密码不一定是你的邮箱登录密码',
    content:` <img  src="https://wework.qpic.cn/wwpic3az/71767_Su4zHv9bTWic9F8_1718954450/0" />`
  },
  {
    title:'发信名称',
    abs:'发给用户的邮件上，显示对应的名称',
  },
  {
    title:'ssl',
    abs:'是否启用ssl传输',
    content:'启用ssl之后对应的端口号可能要做出调整'
  },
  {
    title:'tls',
    abs:'是否启用tls传输',
    content:'现代浏览器和服务器广泛支持'
  }
]
getEmail()
const testConnectionToQQEmail = async () =>{}
const saveQQEmailConfig = async () =>{}
</script>

<template>
<div class="config_email">
  <div class="left">
    <div class="site_info">
      <gvb_title title="邮箱配置"/>
      <a-alert style="margin-top: 20px">配置邮箱之后，系统配置会通知到你的邮箱，不配置则不通知</a-alert>
      <a-form :model="emailForm" ref="formRef" :label-col-props="{span:6}" :wrapper-col-props="{span:18}">
        <a-form-item label="邮箱域名" field="host" :rules="[{required:true,message:'请输入邮箱域名'}]"   :validate-trigger="['blur']">
          <a-input placeholder="请输入邮箱域名" v-model="emailForm.host" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="邮箱端口" field="port" :rules="[{required:true,message:'请输入邮箱端口'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入邮箱端口" v-model="emailForm.port" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="邮箱协议" field="protocol" :rules="[{required:true,message:'请输入协议'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入协议" v-model="emailForm.protocol" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="发信邮箱" field="username" :rules="[{required:true,message:'请输入发信邮箱'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入发信邮箱" v-model="emailForm.username" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="密码" field="password" :rules="[{required:true,message:'请输入密码'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入密码" v-model="emailForm.password" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="昵称" field="password" :rules="[{required:true,message:'请输入昵称'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入昵称" v-model="emailForm.nickname" allow-clear class="custom-input"/>
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
        <a-form-item label="SSL" field="ssl" :rules="[{required:true,message:'请输入ssl'}]" :validate-trigger="['blur']">
          <a-switch v-model="emailForm.ssl.enable" />
        </a-form-item>
        <a-form-item label="TLS" field="useTls" :rules="[{ required: true, message: '请输入TLS' }]">
          <a-switch v-model="emailForm.startTls.enable" />
        </a-form-item>
      </a-form>
    </div>
  </div>
  <div class="right">
    <gvb_help  title="帮助" :data="helpList"/>
  </div>
  <!-- 底部操作按钮 -->
  <div class="footer-actions">
    <a-space>
      <a-button type="primary" status="success" @click="testConnectionToQQEmail">测试链接</a-button>
      <a-button type="primary" @click="saveQQEmailConfig">保存配置</a-button>
    </a-space>
  </div>
</div>
</template>

<style scoped lang="scss">
.config_email {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: row;

  .left {
    width: 40%;
    padding-right: 12px;
    .arco-form{
      margin-top: 20px;
    }
  }
  .right{
    width: 60%;
    margin-left: 30px;
  }
  .footer-actions {
    position: absolute;
    bottom: 50px;
    right: 60px;
    background: var(--bg);
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
}
</style>
