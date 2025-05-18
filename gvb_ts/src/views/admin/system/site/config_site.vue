<script setup lang="ts">

import Gvb_title from "@/components/admin/gvb_title.vue";
import {reactive, ref} from "vue";
import {getSetting, type settingsType, updateSetting} from "@/api/settings_api.ts";
import {Message} from "@arco-design/web-vue";
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
const getSiteInfo = async () => {
  let res = await getSetting()
  Object.assign(siteForm, res.data)
}
const formRef = ref()
// 更新网站配置
const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    await updateSetting(siteForm);
    Message.success("配置更新成功");
    getSiteInfo();
  } catch (error) {
    Message.error("配置更新失败");
  }
};
getSiteInfo()
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
        <a-form-item label="建站日期" field="createdAt" :rules="[{ required: true, message: '请输入建站日期' }]">
          <a-date-picker v-model="siteForm.createdAt" style="width: 100%" />
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
    <div class="user_info">
      <gvb_title title="用户信息"/>
      <a-form :model="siteForm" ref="formRef" :label-col-props="{span:3}" :wrapper-col-props="{span:19}">
        <a-form-item label="昵称" field="name" :rules="[{required:true,message:'请输入昵称'}]"   :validate-trigger="['blur']">
          <a-input placeholder="请输入昵称" v-model="siteForm.name" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="工作" field="job" :rules="[{required:true,message:'请输入工作'}]"   :validate-trigger="['blur']">
          <a-input placeholder="请输入工作" v-model="siteForm.job" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="地址" field="addr" :rules="[{required:true,message:'请输入地址'}]"   :validate-trigger="['blur']">
          <a-input placeholder="请输入地址" v-model="siteForm.addr" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="邮箱" field="email" :rules="[{required:true,message:'请输入邮箱'}]"   :validate-trigger="['blur']">
          <a-input placeholder="请输入邮箱" v-model="siteForm.email" allow-clear class="custom-input"/>
        </a-form-item>
      </a-form>
    </div>
    <div class="link_info">
      <gvb_title title="链接信息"/>
      <a-form :model="siteForm" ref="formRef" :label-col-props="{span:4}" :wrapper-col-props="{span:18}">
        <a-form-item label="bilibiliUrl" field="bilibiliUrl" :rules="[{required:true,message:'请输入哔哩哔哩地址'}]"   :validate-trigger="['blur']">
          <a-input placeholder="请输入哔哩哔哩地址" v-model="siteForm.bilibiliUrl" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="gitee" field="giteeUrl" :rules="[{required:true,message:'请输入gitee地址'}]"   :validate-trigger="['blur']">
          <a-input placeholder="请输入gitee地址" v-model="siteForm.giteeUrl" allow-clear class="custom-input"/>
        </a-form-item>
        <a-form-item label="github" field="githubUrl" :rules="[{required:true,message:'请输入github地址'}]"   :validate-trigger="['blur']">
          <a-input placeholder="请输入github地址" v-model="siteForm.githubUrl" allow-clear class="custom-input"/>
        </a-form-item>
      </a-form>
    </div>

  </div>
  <!-- 底部操作按钮 -->
  <div class="footer-actions">
    <a-space>
      <a-button type="primary" @click="handleSubmit">保存配置</a-button>
      <a-button @click="getSiteInfo">重置修改</a-button>
    </a-space>
  </div>
</div>
</template>

<style lang="scss">
.config_site {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding-bottom: 60px; /* 为底部按钮留出空间 */

  .left {
    width: 50%;
    padding-right: 12px;
    .site_info {
    }
  }

  .right {
    width: 50%;
    padding-left: 12px;
  }

  .arco-form {
    margin-top: 20px;
    .custom-input {
      border-radius: 6px;
      border: 1px solid #e5e6eb;
      transition: all 0.2s ease;

      &:hover {
        border-color: #c9cdd4;
      }

      &:focus {
        border-color: #165dff;
        box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.1);
      }
    }
  }

  .footer-actions {
    position: fixed;
    bottom: 200px;
    right: 60px;
    background: var(--bg);
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
}

@media (max-width: 768px) {
  .config_site {
    flex-direction: column;
    .left,
    .right {
      width: 100%;
      padding: 0;
    }
    .right {
      margin-top: 20px;
    }
  }
}
</style>
