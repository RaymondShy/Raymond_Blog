<script setup lang="ts">

import Gvb_title from "@/components/admin/gvb_title.vue";
import {reactive, ref} from "vue";
import {getOSSConfig, type ossType} from "@/api/settings_api.ts";
import Gvb_help from "@/components/admin/gvb_help.vue";
const formRef = ref()
const ossForm = reactive<ossType>({
  endpoint:"",
  enable:true,
  accessKeyId:"",
  accessKeySecret:"",
  bucketName:"",
  region:"",
})
const getOSSInfo = async () => {
  const res = await getOSSConfig()
  Object.assign(ossForm,res.data)
}
getOSSInfo()
const ossHelpList = [
  {
    title: "存储服务类型",
    abs: "选择你使用的对象存储平台",
    content: `
常见对象存储服务包括：
<ul>
  <li>阿里云 OSS</li>
  <li>腾讯云 COS</li>
  <li>七牛云 Kodo</li>
  <li>MinIO（本地或私有化部署）</li>
</ul>
<br>
<img src="../../../../../public/image/oss/5681747794195_.pic_hd.jpg" alt="对象存储示意图" />
`
  },
  {
    title: "Bucket 名称",
    abs: "对象存储空间的唯一标识",
    content: `
如：<code>my-blog-assets</code>。填写时请确保与控制台中创建的名称完全一致。
`
  },
  {
    title: "访问域名（Endpoint）",
    abs: "对象存储服务提供的访问入口",
    content: `
如阿里云格式：<code>https://oss-cn-hangzhou.aliyuncs.com</code>，其他服务商格式请参考其官方文档。
<br>
<img src="../../../../../public/image/oss/5691747794196_.pic_hd.jpg" alt="Endpoint 示例" />
`
  },
  {
    title: "外链前缀",
    abs: "生成公共访问地址所需的 URL 前缀",
    content: `
通常以 CDN 域名或绑定的自定义域名开头，如：<code>https://cdn.example.com/</code>。
`
  },
  {
    title: "访问权限",
    abs: "建议配置为公共读",
    content: `
如果使用 OSS 托管图片或静态资源，请将 Bucket 设置为“公共读”，否则文件无法直接访问。
`
  }
];




</script>

<template>
  <div class="config_oss">
    <div class="left">
      <div class="site_info">
        <gvb_title title="OSS配置"/>
        <a-alert style="margin-top: 20px">启用OSS对象存储之后，图片会上传至OSS对象存储服务器</a-alert>
        <a-form :model="ossForm" ref="formRef" :label-col-props="{span:6}" :wrapper-col-props="{span:18}">
          <a-form-item label="key_id" field="accessKeyId" :rules="[{required:true,message:'请输入accessKeyId'}]"   :validate-trigger="['blur']">
            <a-input  placeholder="请输入key_id" v-model="ossForm.accessKeyId" allow-clear class="custom-input"/>
          </a-form-item>
          <a-form-item label="secret" field="accessKeySecret" :rules="[{required:true,message:'请输入accessKeySecret'}]" :validate-trigger="['blur']">
            <a-input placeholder="请输入keysecret" v-model="ossForm.accessKeySecret" allow-clear class="custom-input"/>
          </a-form-item>
          <a-form-item label="endpoint" field="endpoint" :rules="[{required:true,message:'请输入endpoint'}]" :validate-trigger="['blur']">
            <a-input placeholder="请输入endpoint" v-model="ossForm.endpoint" allow-clear class="custom-input"/>
          </a-form-item>
          <a-form-item label="region" field="region" :rules="[{required:true,message:'请输入地区'}]" :validate-trigger="['blur']">
            <a-input placeholder="请输入地区" v-model="ossForm.region" allow-clear class="custom-input"/>
          </a-form-item>
          <a-form-item label="令牌桶" field="bucketName" :rules="[{required:true,message:'请输入令牌桶'}]" :validate-trigger="['blur']">
            <a-input placeholder="请输入令牌桶" v-model="ossForm.bucketName" allow-clear class="custom-input"/>
          </a-form-item>
          <a-form-item label="enable" field="enable" :rules="[{required:true,message:'请选择是否启用'}]" :validate-trigger="['blur']">
            <a-switch v-model="ossForm.enable" />
          </a-form-item>
        </a-form>
        <a-button type="primary">更新</a-button>
      </div>
    </div>
    <div class="right">
      <gvb_help title="帮助" :data="ossHelpList"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.config_oss {
  width: 100%;
  max-height: calc(100vh - 170px);
  display: flex;
  position: relative;
  padding-bottom: 60px; /* 为底部按钮留出空间 */
  overflow-y: auto;

  .left {
    width: 40%;
    padding-right: 12px;
    .arco-form{
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
  }
  .right{
    width: 60%;
    margin-left: 30px;
  }
}
</style>
