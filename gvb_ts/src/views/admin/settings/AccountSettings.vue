<template>
  <div class="account-settings-container">
    <a-page-header
        title="账户设置"
        subtitle="管理您的账户信息和安全设置"
        :show-back="true"
        @back="handleBack"
    />

    <div class="settings-content">
      <!-- 导航菜单 -->
      <div class="settings-nav">
        <a-anchor
            :current-offset="100"
            :affix="false"
            @change="handleAnchorChange"
        >
          <a-anchor-link href="#basic-info" title="基本信息" />
          <a-anchor-link href="#security" title="安全设置" />
          <a-anchor-link href="#notifications" title="通知偏好" />
          <a-anchor-link href="#social-accounts" title="社交账号" />
        </a-anchor>
      </div>

      <!-- 设置内容区域 -->
      <div class="settings-main">
        <!-- 基本信息部分 -->
        <section id="basic-info" class="settings-section">
          <h2 class="section-title">基本信息</h2>
          <a-form
              :model="form"
              :label-col-props="{ span: 6 }"
              :wrapper-col-props="{ span: 18 }"
              label-align="left"
          >
            <a-form-item label="头像">
              <div class="avatar-uploader">
                <a-avatar :size="80" class="avatar">
                  <img v-if="form.avatar" :src="form.avatar" alt="头像" />
                  <span v-else>{{ form.name.charAt(0) }}</span>
                </a-avatar>
                <a-upload
                    action="/api/upload"
                    :show-file-list="false"
                    @change="handleAvatarChange"
                >
                  <template #upload-button>
                    <a-button type="outline">更换头像</a-button>
                  </template>
                </a-upload>
              </div>
            </a-form-item>

            <a-form-item label="用户名" field="name">
              <a-input v-model="form.name" placeholder="请输入用户名" />
            </a-form-item>

            <a-form-item label="电子邮箱" field="email">
              <a-input v-model="form.email" placeholder="请输入电子邮箱" />
              <template #extra>
                <span v-if="form.emailVerified" class="verified-tag">
                  <icon-check-circle-fill style="color: #00b42a" /> 已验证
                </span>
                <span v-else class="unverified-tag">
                  <icon-exclamation-circle-fill style="color: #ff7d00" /> 未验证
                  <a-link @click="sendVerifyEmail">发送验证邮件</a-link>
                </span>
              </template>
            </a-form-item>

            <a-form-item label="手机号码" field="phone">
              <a-input v-model="form.phone" placeholder="请输入手机号码" />
            </a-form-item>

            <a-form-item label="个人简介" field="bio">
              <a-textarea
                  v-model="form.bio"
                  placeholder="介绍一下你自己..."
                  :auto-size="{ minRows: 3, maxRows: 5 }"
              />
            </a-form-item>

            <a-form-item :wrapper-col-props="{ offset: 6 }">
              <a-space>
                <a-button type="primary" @click="saveBasicInfo">保存更改</a-button>
                <a-button @click="resetBasicInfo">重置</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </section>

        <!-- 安全设置部分 -->
        <section id="security" class="settings-section">
          <h2 class="section-title">安全设置</h2>

          <div class="security-item">
            <div class="security-label">账户密码</div>
            <div class="security-content">
              <span>已设置</span>
              <span class="security-time">最近修改于 2023-10-15</span>
            </div>
            <a-link @click="showPasswordModal">修改密码</a-link>
          </div>

          <div class="security-item">
            <div class="security-label">双重认证</div>
            <div class="security-content">
              <a-switch v-model="form.twoFactorEnabled" />
              <span class="security-desc">{{ form.twoFactorEnabled ? '已启用' : '未启用' }}</span>
            </div>
            <a-link @click="setupTwoFactorAuth">设置</a-link>
          </div>

          <div class="security-item">
            <div class="security-label">登录设备</div>
            <div class="security-content">
              <span>3 台设备</span>
            </div>
            <a-link @click="viewDevices">查看</a-link>
          </div>

          <div class="security-item danger-item">
            <div class="security-label">注销账户</div>
            <div class="security-content">
              <span class="danger-text">永久删除账户及所有数据</span>
            </div>
            <a-link status="danger" @click="showDeleteAccountModal">注销</a-link>
          </div>
        </section>

        <!-- 通知偏好部分 -->
        <section id="notifications" class="settings-section">
          <h2 class="section-title">通知偏好</h2>

          <a-form
              :model="notificationSettings"
              :label-col-props="{ span: 8 }"
              :wrapper-col-props="{ span: 16 }"
              label-align="left"
          >
            <a-form-item label="系统通知">
              <a-switch v-model="notificationSettings.system" />
            </a-form-item>

            <a-form-item label="安全提醒">
              <a-switch v-model="notificationSettings.security" />
            </a-form-item>

            <a-form-item label="产品更新">
              <a-switch v-model="notificationSettings.updates" />
            </a-form-item>

            <a-form-item label="营销信息">
              <a-switch v-model="notificationSettings.marketing" />
            </a-form-item>

            <a-form-item label="通知方式">
              <a-checkbox-group v-model="notificationSettings.methods">
                <a-checkbox value="email">电子邮件</a-checkbox>
                <a-checkbox value="sms">短信</a-checkbox>
                <a-checkbox value="push">推送通知</a-checkbox>
              </a-checkbox-group>
            </a-form-item>

            <a-form-item :wrapper-col-props="{ offset: 8 }">
              <a-button type="primary" @click="saveNotificationSettings">保存设置</a-button>
            </a-form-item>
          </a-form>
        </section>

        <!-- 社交账号部分 -->
        <section id="social-accounts" class="settings-section">
          <h2 class="section-title">社交账号</h2>

          <div class="social-account-list">
            <div class="social-account-item" v-for="account in socialAccounts" :key="account.provider">
              <div class="social-icon">
                <img :src="getSocialIcon(account.provider)" :alt="account.provider" />
              </div>
              <div class="social-info">
                <div class="social-name">{{ getSocialName(account.provider) }}</div>
                <div class="social-status" :class="{ connected: account.connected }">
                  {{ account.connected ? '已绑定' : '未绑定' }}
                </div>
              </div>
              <a-button
                  v-if="account.connected"
                  status="danger"
                  size="small"
                  @click="unbindSocialAccount(account.provider)"
              >
                解绑
              </a-button>
              <a-button
                  v-else
                  type="primary"
                  size="small"
                  @click="bindSocialAccount(account.provider)"
              >
                绑定
              </a-button>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 修改密码模态框 -->
    <a-modal
        v-model:visible="passwordModalVisible"
        title="修改密码"
        @ok="changePassword"
        @cancel="passwordModalVisible = false"
    >
      <a-form :model="passwordForm" layout="vertical">
        <a-form-item label="当前密码" field="currentPassword">
          <a-input-password v-model="passwordForm.currentPassword" placeholder="请输入当前密码" />
        </a-form-item>
        <a-form-item label="新密码" field="newPassword">
          <a-input-password v-model="passwordForm.newPassword" placeholder="请输入新密码" />
        </a-form-item>
        <a-form-item label="确认新密码" field="confirmPassword">
          <a-input-password v-model="passwordForm.confirmPassword" placeholder="请再次输入新密码" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 注销账户确认模态框 -->
    <a-modal
        v-model:visible="deleteAccountModalVisible"
        title="确认注销账户"
        :ok-text="'确认注销'"
        :cancel-text="'取消'"
        :ok-button-props="{ status: 'danger' }"
        @ok="deleteAccount"
    >
      <p>您确定要注销账户吗？此操作将：</p>
      <ul>
        <li>永久删除您的账户</li>
        <li>清除所有个人数据</li>
        <li>无法恢复</li>
      </ul>
      <p>请输入您的密码以确认：</p>
      <a-input-password v-model="deleteAccountPassword" placeholder="请输入密码" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IconCheckCircleFill,
  IconExclamationCircleFill,
} from '@arco-design/web-vue/es/icon';

const router = useRouter();

// 表单数据
const form = reactive({
  avatar: '/public/image/right_img.png',
  name: 'Raymond',
  email: 'user@example.com',
  emailVerified: false,
  phone: '13800138000',
  bio: '前端开发工程师，专注于Vue和React技术栈',
  twoFactorEnabled: false,
});

// 通知设置
const notificationSettings = reactive({
  system: true,
  security: true,
  updates: false,
  marketing: false,
  methods: ['email', 'push'],
});

// 社交账号
const socialAccounts = ref([
  { provider: 'wechat', connected: true },
  { provider: 'github', connected: true },
  { provider: 'google', connected: false },
  { provider: 'twitter', connected: false },
]);

// 密码修改表单
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});
const passwordModalVisible = ref(false);

// 注销账户
const deleteAccountPassword = ref('');
const deleteAccountModalVisible = ref(false);

// 获取社交平台图标和名称
const getSocialIcon = (provider: string) => {
  const icons: Record<string, string> = {
    wechat: '/icons/wechat.png',
    github: '/icons/github.png',
    google: '/icons/google.png',
    twitter: '/icons/twitter.png',
  };
  return icons[provider] || '/icons/default.png';
};

const getSocialName = (provider: string) => {
  const names: Record<string, string> = {
    wechat: '微信',
    github: 'GitHub',
    google: 'Google',
    twitter: 'Twitter',
  };
  return names[provider] || provider;
};

// 处理头像上传
const handleAvatarChange = (file: File) => {
  // 这里应该是上传逻辑，简化处理直接显示
  const reader = new FileReader();
  reader.onload = (e) => {
    form.avatar = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

// 发送验证邮件
const sendVerifyEmail = () => {
  console.log('发送验证邮件');
  // 实际应用中这里应该调用API
};

// 保存基本信息
const saveBasicInfo = () => {
  console.log('保存基本信息', form);
  // 实际应用中这里应该调用API
};

// 重置基本信息
const resetBasicInfo = () => {
  console.log('重置基本信息');
  // 这里应该从服务器重新获取数据
};

// 显示修改密码模态框
const showPasswordModal = () => {
  passwordModalVisible.value = true;
};

// 修改密码
const changePassword = () => {
  console.log('修改密码', passwordForm);
  // 实际应用中这里应该调用API
  passwordModalVisible.value = false;
};

// 设置双重认证
const setupTwoFactorAuth = () => {
  console.log('设置双重认证');
};

// 查看登录设备
const viewDevices = () => {
  console.log('查看登录设备');
};

// 绑定社交账号
const bindSocialAccount = (provider: string) => {
  console.log('绑定', provider);
  // 实际应用中这里应该调用API或跳转到授权页面
};

// 解绑社交账号
const unbindSocialAccount = (provider: string) => {
  console.log('解绑', provider);
  // 实际应用中这里应该调用API
};

// 保存通知设置
const saveNotificationSettings = () => {
  console.log('保存通知设置', notificationSettings);
  // 实际应用中这里应该调用API
};

// 显示注销账户模态框
const showDeleteAccountModal = () => {
  deleteAccountModalVisible.value = true;
};

// 注销账户
const deleteAccount = () => {
  console.log('注销账户');
  // 实际应用中这里应该调用API
  deleteAccountModalVisible.value = false;
};

// 返回上一页
const handleBack = () => {
  router.go(-1);
};

onMounted(() => {
  // 组件挂载时可以从服务器获取数据
  // fetchUserSettings();
});
</script>

<style lang="scss" scoped>
.account-settings-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .settings-content {
    display: flex;
    margin-top: 20px;
    gap: 20px;

    .settings-nav {
      width: 200px;
      position: sticky;
      top: 20px;
      height: fit-content;

      :deep(.arco-anchor) {
        border: none;

        .arco-anchor-link {
          padding: 8px 0;

          &-title {
            font-size: 14px;
            color: var(--color-text-2);
          }

          &-active .arco-anchor-link-title {
            color: var(--color-primary);
          }
        }
      }
    }

    .settings-main {
      flex: 1;
      background-color: var(--color-bg-2);
      border-radius: 4px;
      padding: 20px;
    }
  }

  .settings-section {
    margin-bottom: 40px;

    .section-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      color: var(--color-text-1);
    }
  }

  .avatar-uploader {
    display: flex;
    align-items: center;
    gap: 20px;

    .avatar {
      background-color: var(--color-primary-light-3);
      color: var(--color-primary);
    }
  }

  .verified-tag, .unverified-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
  }

  .security-item {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid var(--color-border);

    &.danger-item {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid var(--color-border);
    }

    .security-label {
      width: 120px;
      font-weight: 500;
    }

    .security-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;

      .security-time {
        font-size: 12px;
        color: var(--color-text-3);
      }

      .security-desc {
        font-size: 12px;
        color: var(--color-text-2);
      }
    }

    .danger-text {
      color: var(--color-error);
    }
  }

  .social-account-list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .social-account-item {
      display: flex;
      align-items: center;
      padding: 12px;
      background-color: var(--color-fill-1);
      border-radius: 4px;
      gap: 12px;

      .social-icon {
        width: 32px;
        height: 32px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .social-info {
        flex: 1;

        .social-name {
          font-weight: 500;
        }

        .social-status {
          font-size: 12px;
          color: var(--color-text-3);

          &.connected {
            color: var(--color-success);
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .account-settings-container {
    padding: 10px;

    .settings-content {
      flex-direction: column;

      .settings-nav {
        width: 100%;
        position: static;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
