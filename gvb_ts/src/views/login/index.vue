<template>
  <div class="login-container">
    <!-- Left side - Carousel -->
    <div class="carousel-container">
      <a-carousel :auto-play="true" animation-name="fade" :interval="3000" show-arrow="hover" class="carousel">
        <a-carousel-item v-for="(image, index) in carouselImages" :key="index">
          <div class="carousel-image-container">
            <img :src="image.url" :alt="'Carousel image ' + (index + 1)" class="carousel-image"/>
            <div class="carousel-caption" v-if="image.caption">
              <h3>{{ image.caption.title }}</h3>
              <p>{{ image.caption.description }}</p>
            </div>
          </div>
        </a-carousel-item>
      </a-carousel>
    </div>

    <!-- Right side - Login Form -->
    <div class="login-form-container">
      <div class="gvb_login_form">
        <a-form ref="formRef" :model="form" :label-col-props="{span: 0}" :wrapper-col-props="{span: 24}">
          <div class="logo-container">
            <img src="/public/image/logo.svg" alt="Codecify Logo" class="logo">
          </div>
          <div class="gvb_login_form_title">欢迎来到Codecify</div>
          <div class="gvb_login_form_subtitle">开启您的技术博客之旅</div>

          <a-form-item field="username" label="用户名"
                       :rules="[{required:true,message:'请输入用户名'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.username" placeholder="请输入用户名" allow-clear>
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

          <a-button type="primary" long size="large" class="login-btn" @click="loginPwdClick" :loading="loading">
            登录
          </a-button>

          <div class="register-link">
            还没有账号? <a-link @click="goRegister">立即注册</a-link>
          </div>

          <div class="other-login">
            <div class="label">第三方登录</div>
            <div class="icons">
              <a-tooltip v-for="icon in socialIcons" :key="icon.name" :content="`使用${icon.name}登录`" position="bottom">
                <a href="#" class="icon-item">
                  <img :src="icon.src" :alt="icon.name">
                </a>
              </a-tooltip>
            </div>
          </div>
        </a-form>
      </div>
      <div class="login-footer">
        <p>© 2025 Codecify · 技术博客平台 · <a-link>服务条款</a-link> · <a-link>隐私政策</a-link></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import { IconUser, IconLock } from "@arco-design/web-vue/es/icon";
import {loginPwdApi} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";
import {useRouter} from "vue-router";
import {useCounterStore} from "@/stores/counter.ts";
import {useAxios} from "@/api";

const router = useRouter()
const store = useCounterStore()
const loading = ref(false)
const form = reactive({
  username: "",
  password: ""
});

// Carousel images (using online resources)
const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    caption: {
      title: "分享你的技术见解",
      description: "与全球开发者交流学习"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    caption: {
      title: "探索前沿技术",
      description: "发现最新编程趋势和工具"
    }
  },
  {
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    caption: {
      title: "构建你的开发者社区",
      description: "连接志同道合的技术爱好者"
    }
  }
];

const socialIcons = [
  { name: "QQ", src: "/image/QQ.png" },
  { name: "微信", src: "/image/weixin.png" },
  { name: "Facebook", src: "/image/facebook.png" },
  { name: "Gmail", src: "/image/gmail.png" },
  { name: "GitHub", src: "/image/github.png" }
];

const goRegister = () => {
  router.push("/register")
}

const formRef = ref()
const loginPwdClick = async () => {
  loading.value = true
  let val = await formRef.value.validate()
  if (val) {
    loading.value = false
    return
  }

  try {
    let res = await loginPwdApi(form)
    if (res.code !== 200){
      Message.error(res.msg)
      return
    }
    const token = res.data
    localStorage.setItem('token', token)
    useAxios.defaults.headers['Authorization'] = `Bearer ${token}`
    Message.success(res.msg)
    store.setToken(res.data)
    router.push("/admin")
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .carousel-container {
    flex: 1;
    height: 100%;
    position: relative;

    .carousel {
      height: 100%;
      width: 100%;

      &-image-container {
        height: 100vh;
        width: 100%;
        position: relative;

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .carousel-caption {
          position: absolute;
          bottom: 100px;
          left: 50px;
          color: white;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
          max-width: 500px;

          h3 {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          p {
            font-size: 1.2rem;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .login-form-container {
    width: 420px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background: radial-gradient(circle at 10% 20%, rgba(91, 173, 254, 0.1) 0%, rgba(91, 173, 254, 0.1) 90%),
    linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    //background: rgba(255, 255, 255, 0.98);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.05);
    //&::before {
    //  content: "";
    //  position: absolute;
    //  top: 0;
    //  left: 0;
    //  width: 100%;
    //  height: 100%;
    //  background: url("/image/bg.jpg") center/cover no-repeat;
    //  opacity: 0.1;
    //  z-index: 0;
    //}

    .gvb_login_form {
      width: 100%;
      padding: 40px;
      animation: fadeInUp 0.6s ease-out;
      position: relative;
      transition: transform 0.3s, box-shadow 0.3s;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%);
      }


      .logo-container {
        text-align: center;
        margin-bottom: 20px;

        .logo {
          height: 60px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
      }

      .gvb_login_form_title {
        font-size: 24px;
        margin-bottom: 8px;
        text-align: center;
        font-weight: 600;
        color: #2c3e50;
        letter-spacing: 1px;
      }

      .gvb_login_form_subtitle {
        font-size: 14px;
        text-align: center;
        color: #7f8c8d;
        margin-bottom: 30px;
        letter-spacing: 0.5px;
      }

      .input-icon {
        color: #95a5a6;
        font-size: 16px;
      }

      .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        font-size: 14px;

        .arco-checkbox {
          color: #7f8c8d;
        }
      }

      .login-btn {
        height: 44px;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 20px;
        transition: all 0.3s;
        background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
        border: none;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);
          background: linear-gradient(to right, #3aa0f7 0%, #00d9e9 100%);
        }

        &:active {
          transform: translateY(0);
        }
      }

      .register-link {
        text-align: center;
        margin-bottom: 25px;
        font-size: 14px;
        color: #7f8c8d;

        .arco-link {
          color: #3498db;
          font-weight: 500;
        }
      }

      .other-login {
        margin-top: 25px;

        .label {
          font-size: 14px;
          display: flex;
          align-items: center;
          color: #95a5a6;
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
            cursor: pointer;

            &:hover {
              background: #e0e0e0;
              transform: translateY(-3px);
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }

            img {
              width: 20px;
              height: 20px;
              object-fit: contain;
              transition: transform 0.3s;
            }

            &:hover img {
              transform: scale(1.1);
            }
          }
        }
      }
    }

    .login-footer {
      margin-top: auto;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #95a5a6;
      width: 100%;

      p {
        margin: 0;
      }

      a {
        color: inherit;
        margin: 0 8px;
        transition: color 0.3s;

        &:hover {
          color: #3498db;
        }
      }
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

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;

    .carousel-container {
      display: none;
    }

    .login-form-container {
      width: 100%;
      height: auto;
      min-height: 100vh;
      padding: 20px;

      .gvb_login_form {
        padding: 30px 20px;

        &::after {
          width: 3px;
        }
      }
    }
  }
}
</style>
