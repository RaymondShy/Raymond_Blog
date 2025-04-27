<template>
  <div class="gvb_login">
    <div class="gvb_login_form">
      <a-form ref="formRef" :model="form" :label-col-props="{span: 0}" :wrapper-col-props="{span: 24}">
        <div class="gvb_login_form_title">欢迎来到Codecify</div>
        <div class="gvb_login_form_subtitle">开启您的技术博客之旅</div>

        <a-form-item field="user_name" label="用户名"
                     :rules="[{required:true,message:'请输入用户名'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.userName" placeholder="请输入用户名" allow-clear>
            <template #prefix>
              <icon-user class="input-icon"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item field="password" label="密码"
                     :rules="[{required:true,message:'请输入密码'}]"
                     :validate-trigger="['blur']"
        >
          <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear>
            <template #prefix>
              <icon-lock class="input-icon"/>
            </template>
          </a-input-password>
        </a-form-item>

        <div class="form-options">
          <a-checkbox>记住我</a-checkbox>
          <a-link>忘记密码?</a-link>
        </div>

        <a-button type="primary" long size="large" class="login-btn">
          登录
        </a-button>

        <div class="register-link">
          还没有账号? <a-link>立即注册</a-link>
        </div>

        <div class="other-login">
          <div class="label">第三方登录</div>
          <div class="icons">
            <a href="#" class="icon-item" v-for="icon in socialIcons" :key="icon.name">
              <img :src="icon.src" :alt="icon.name" :title="icon.name">
            </a>
          </div>
        </div>
      </a-form>
    </div>
    <div class="login-footer">
      <p>© 2025 Codecify · 技术博客平台 · <a-link>服务条款</a-link> · <a-link>隐私政策</a-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IconUser, IconLock } from "@arco-design/web-vue/es/icon";

const form = reactive({
  userName: "",
  password: ""
});

const socialIcons = [
  { name: "QQ", src: "/image/QQ.png" },
  { name: "微信", src: "/image/weixin.png" },
  { name: "Facebook", src: "/image/facebook.png" },
  { name: "Gmail", src: "/image/gmail.png" },
  { name: "GitHub", src: "/image/github.png" }
];
</script>

<style lang="scss" scoped>
.gvb_login {
  width: 100%;
  height: 100vh;
  //background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/image/bg.jpg") center/cover no-repeat;
    opacity: 0.2;
    z-index: 0;
  }

  .gvb_login_form {
    width: 400px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    z-index: 1;
    animation: fadeInUp 0.6s ease-out;

    .gvb_login_form_title {
      font-size: 28px;
      margin-bottom: 8px;
      text-align: center;
      font-weight: 600;
      color: #333;
    }

    .gvb_login_form_subtitle {
      font-size: 14px;
      text-align: center;
      color: #666;
      margin-bottom: 30px;
    }

    .input-icon {
      color: #999;
      font-size: 16px;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      font-size: 14px;
    }

    .login-btn {
      height: 44px;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }
    }

    .register-link {
      text-align: center;
      margin-bottom: 25px;
      font-size: 14px;
      color: #666;
    }

    .other-login {
      margin-top: 25px;

      .label {
        font-size: 14px;
        display: flex;
        align-items: center;
        color: #999;
        margin-bottom: 15px;
        justify-content: center;

        &::before, &::after {
          display: inline-flex;
          width: 30%;
          height: 1px;
          content: "";
          background-color: #eee;
          margin: 0 10px;
        }
      }

      .icons {
        display: flex;
        justify-content: center;
        gap: 15px;

        .icon-item {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          border-radius: 50%;
          transition: all 0.3s;

          &:hover {
            background: #e0e0e0;
            transform: translateY(-3px);
          }

          img {
            width: 20px;
            height: 20px;
            object-fit: contain;
          }
        }
      }
    }
  }
  .login-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 12px;
    color: #95a5a6;
    position: fixed;
    bottom: 5px;

    a {
      color: inherit;
      margin: 0 8px;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .gvb_login {
    padding: 20px;

    .gvb_login_form {
      width: 100%;
      padding: 30px 20px;
    }
  }
}
</style>
