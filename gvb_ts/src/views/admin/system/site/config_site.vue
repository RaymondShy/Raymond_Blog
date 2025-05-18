<script setup lang="ts">

import Gvb_title from "@/components/admin/gvb_title.vue";
import {reactive} from "vue";
import type {settingsType} from "@/api/settings_api.ts";
const siteForm = reactive<settingsType>({
  addr: "",
  beiAn: "",
  bilibiliUrl: "",
  createdAt: "",
  email: "",
  giteeUrl: "",
  githubUrl: "",
  job: "",
  name: "",
  qqImage: "",
  slogan: "",
  sloganEn: "",
  title: "",
  version: "",
  web: "",
  wechatImage:"",
})
</script>

<template>
<div class="config_site">
  <div class="left">
    <div class="site_info">
      <gvb_title title="网站配置"/>
      <a-form :model="siteForm" ref="formRef" :label-col-props="{span:5}" :wrapper-col-props="{span:16}">
        <a-form-item label="网站标题" field="title" :rules="[{required:true,message:'请输入网站标题'}]"   :validate-trigger="['blur']">
          <a-input placeholder="请输入网站标题" v-model="siteForm.title" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="slogan" field="slogan" :rules="[{required:true,message:'请输入slogan'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入slogan" v-model="siteForm.slogan" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="slogan en" field="sloganEn" :rules="[{required:true,message:'请输入sloganEn'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入英文sloganEn" v-model="siteForm.sloganEn" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="备案" field="beiAn" :rules="[{required:true,message:'请输入备案编号'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入备案" v-model="siteForm.beiAn" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="version" field="version" :rules="[{required:true,message:'请输入网站版本'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入网站版本" v-model="siteForm.version" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="建站日期" field="createdAt" :rules="[{required:true,message:'请输入建站日期'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入建站日期" v-model="siteForm.createdAt" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="QQ" field="qqImage" :rules="[{required:true,message:'qq图片路径'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入qq图片路径" v-model="siteForm.qqImage" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="wechat" field="wechatImage" :rules="[{required:true,message:'wechat图片路径'}]" :validate-trigger="['blur']">
          <a-input placeholder="请输入wechat图片路径" v-model="siteForm.wechatImage" allow-clear class="custom-input"/>
        </a-form-item>
      </a-form>
    </div>
  </div>
  <div class="right">
    <gvb_title title="个人信息"/>
    <gvb_title title="链接配置"/>
  </div>
</div>
</template>

<style lang="scss">
.config_site{
  width: 100%;
  display: flex;
  .left{
    width: 50%;
    .site_info{
      .arco-form{
        margin-top: 20px;
        .custom-input{
          border-radius: 6px;
          border: 1px solid #e5e6eb;
          transition: all 0.2s ease;
        }
      }
    }
  }
  .right{
    width: 50%;
  }
}
</style>
