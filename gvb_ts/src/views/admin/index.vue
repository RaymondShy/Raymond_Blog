<template>
  <div class="gvb_admin">
    <aside>
      <Gvb_logo/>
      <Gvb_menu/>
    </aside>
    <main>
      <div class="gvb_head">
        <!-- 替换面包屑为页面标题和快捷操作 -->
        <div class="page-header">
          <h2 class="page-title">{{ currentPageTitle }}</h2>
          <div class="quick-actions">
            <a-tooltip content="刷新页面" position="bottom">
              <div class="action-icon" @click="handleRefresh">
                <icon-refresh />
              </div>
            </a-tooltip>
            <a-tooltip content="返回上一页" position="bottom">
              <div class="action-icon" @click="handleBack">
                <icon-arrow-left />
              </div>
            </a-tooltip>
          </div>
        </div>

        <!-- 右侧功能区 -->
        <div class="gvb_function_area">
          <!-- 搜索框 -->
          <a-input-search
              placeholder="搜索..."
              class="search-input"
              allow-clear
          />

          <!-- 通知中心 -->
          <a-dropdown trigger="click" position="br">
            <a-badge :count="unreadCount" dot>
              <div class="action-icon">
                <icon-notification />
              </div>
            </a-badge>
            <template #content>
              <a-doption v-for="(notice, index) in notices" :key="index">
                <template #icon>
                  <icon-exclamation-circle v-if="notice.type === 'alert'" />
                  <icon-message v-else />
                </template>
                {{ notice.content }}
                <span class="notice-time">{{ notice.time }}</span>
              </a-doption>
              <a-divider />
              <a-doption @click="viewAllNotices">查看所有通知</a-doption>
            </template>
          </a-dropdown>

          <!-- 主题切换 -->
          <Gvb_theme class="action-icon"/>

          <!-- 语言切换 -->
          <a-dropdown trigger="click">
            <div class="action-icon">
              <icon-translate />
            </div>
            <template #content>
              <a-doption
                  v-for="lang in languages"
                  :key="lang.value"
                  :class="{ 'selected': currentLang === lang.value }"
                  @click="changeLanguage(lang.value)"
              >
                {{ lang.label }}
              </a-doption>
            </template>
          </a-dropdown>

          <!-- 用户菜单 -->
          <a-dropdown trigger="click">
            <div class="gvb_menu_dropdown_text">
              <a-avatar :size="30" class="user-avatar">
                <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="用户头像">
                <span v-else>{{ userInfo.name.charAt(0) }}</span>
              </a-avatar>
              <span class="user-name">{{ userInfo.name }}</span>
              <IconDown class="dropdown-icon"/>
            </div>
            <template #content>
              <a-doption @click="goToProfile">
                <template #icon><icon-user /></template>
                个人中心
              </a-doption>
              <a-doption @click="goToSettings">
                <template #icon><icon-settings /></template>
                账户设置
              </a-doption>
              <a-divider />
              <a-doption @click="handleLogout" class="logout-option">
                <template #icon><icon-export /></template>
                退出登录
              </a-doption>
            </template>
          </a-dropdown>
        </div>
      </div>

      <Gvb_tabs/>

      <div class="gvb_container">
        <!-- 内容部分添加过渡 -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import {
  IconDown,
  IconNotification,
  IconUser,
  IconSettings,
  IconExport,
  IconRefresh,
  IconArrowLeft,
  IconExclamationCircle,
  IconMessage,
  IconTranslate
} from '@arco-design/web-vue/es/icon';
import Gvb_menu from "@/components/admin/gvb_menu.vue";
import Gvb_logo from "@/components/admin/gvb_logo.vue";
import Gvb_tabs from "@/components/admin/gvb_tabs.vue";
import Gvb_theme from "@/components/admin/gvb_theme.vue";
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 用户信息
const userInfo = ref({
  name: 'Raymond',
  avatar: '/public/image/right_img.png' // 可以设置为实际的头像URL
});

// 当前页面标题
const currentPageTitle = computed(() => {
  return route.meta.title || '控制台';
});

// 语言切换功能
const languages = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' }
];
const currentLang = ref('zh');

function changeLanguage(lang: string) {
  currentLang.value = lang;
  // 这里可以添加实际的语言切换逻辑
}

// 通知功能
const notices = ref([
  { type: 'message', content: '您有新的订单待处理', time: '10分钟前' },
  { type: 'alert', content: '系统将在今晚进行维护', time: '1小时前' },
  { type: 'message', content: '您的账户已通过验证', time: '3小时前' }
]);

const unreadCount = computed(() => {
  return notices.value.length;
});

function viewAllNotices() {
  // 跳转到通知页面或显示全部通知
  console.log('查看所有通知');
}

// 快捷操作
function handleRefresh() {
  window.location.reload();
}

function handleBack() {
  router.go(-1);
}

function goToProfile() {
  router.push('/profile');
}

function goToSettings() {
  router.push('/admin/settings');
}

function handleLogout() {
  // 退出登录逻辑
  console.log('执行退出登录');
  router.push('/login');
}
</script>
<style lang="scss" scoped>
.gvb_admin {
  width: 100%;
  height: 100vh;
  display: flex;

  aside {
    width: 200px;
    height: 100%;
    background-color: var(--color-bg-1);
    box-shadow: 1px 0 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
    transition: width 0.3s;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .gvb_head {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      background-color: var(--color-bg-1);
      border-bottom: 1px solid var(--color-border);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
      z-index: 1;

      .page-header {
        display: flex;
        align-items: center;
        gap: 15px;

        .page-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--color-text-1);
        }

        .quick-actions {
          display: flex;
          gap: 10px;

          .action-icon {
            font-size: 16px;
            color: var(--color-text-2);
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: all 0.2s;

            &:hover {
              color: var(--color-primary);
              background-color: var(--color-fill-2);
            }
          }
        }
      }

      .gvb_function_area {
        display: flex;
        align-items: center;
        gap: 15px;

        .search-input {
          width: 180px;
          transition: width 0.3s;

          &:focus-within {
            width: 220px;
          }
        }

        .action-icon {
          font-size: 18px;
          color: var(--color-text-2);
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: all 0.2s;

          &:hover {
            color: var(--color-primary);
            background-color: var(--color-fill-2);
          }
        }

        .gvb_menu_dropdown_text {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 20px;
          transition: all 0.2s;
          gap: 8px;

          &:hover {
            background-color: var(--color-fill-2);
          }

          .user-avatar {
            background-color: var(--color-primary-light-3);
            color: var(--color-primary);
          }

          .user-name {
            font-size: 14px;
            color: var(--color-text-1);
          }

          .dropdown-icon {
            font-size: 12px;
            color: var(--color-text-3);
            transition: transform 0.2s;
          }
        }
      }
    }

    .gvb_container {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background-color: var(--bg);
      /* 过渡动画样式 */
      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 0.2s ease;
      }

      .fade-enter-from,
      .fade-leave-to {
        opacity: 0;
      }
    }
  }
}

// 通知样式
.notice-time {
  margin-left: 10px;
  font-size: 12px;
  color: var(--color-text-3);
}

// 下拉选项选中状态
.selected {
  color: var(--color-primary);
  background-color: var(--color-primary-light-1);
}

// 退出登录选项特殊样式
.logout-option {
  color: var(--color-error);

  &:hover {
    background-color: var(--color-error-light-1);
  }
}

@media (max-width: 768px) {
  .gvb_admin {
    aside {
      width: 60px;
    }

    main {
      .gvb_head {
        padding: 0 10px;

        .page-header {
          .page-title {
            font-size: 16px;
          }
        }

        .gvb_function_area {
          gap: 8px;

          .search-input {
            display: none;
          }

          .user-name {
            display: none;
          }
        }
      }

      .gvb_container {
        padding: 10px;
      }
    }
  }
}
</style>
