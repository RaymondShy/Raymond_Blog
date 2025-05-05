<template>
  <div class="personal-center-container">
    <!-- 顶部用户信息卡片 -->
    <div class="user-profile-card">
      <div class="cover-image" :style="{ backgroundImage: `url(${userInfo.coverImage})` }"></div>
      <div class="profile-content">
        <div class="avatar-section">
          <a-avatar :size="100" class="user-avatar">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="用户头像" />
            <span v-else>{{ userInfo.name.charAt(0) }}</span>
          </a-avatar>
          <div class="avatar-actions">
            <a-tooltip content="更换头像">
              <a-button shape="circle" size="mini" @click="showAvatarUploader">
                <icon-camera />
              </a-button>
            </a-tooltip>
            <a-tooltip content="更换封面">
              <a-button shape="circle" size="mini" @click="showCoverUploader">
                <icon-image />
              </a-button>
            </a-tooltip>
          </div>
        </div>

        <div class="user-info">
          <h1 class="user-name">{{ userInfo.name }}</h1>
          <p class="user-bio">{{ userInfo.bio || '这个人很懒，什么都没留下' }}</p>

          <div class="user-stats">
            <div class="stat-item">
              <span class="stat-number">{{ userStats.following }}</span>
              <span class="stat-label">关注</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ userStats.followers }}</span>
              <span class="stat-label">粉丝</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ userStats.likes }}</span>
              <span class="stat-label">获赞</span>
            </div>
          </div>

          <div class="user-meta">
            <span v-if="userInfo.location" class="meta-item">
              <icon-location /> {{ userInfo.location }}
            </span>
            <span v-if="userInfo.website" class="meta-item">
              <icon-link />
              <a :href="userInfo.website" target="_blank">{{ userInfo.website }}</a>
            </span>
            <span class="meta-item">
              <icon-clock-circle /> 加入于 {{ userInfo.joinDate }}
            </span>
          </div>
        </div>

        <div class="profile-actions">
          <a-button type="primary" @click="editProfile">编辑资料</a-button>
          <a-button @click="showShareDialog">分享</a-button>
        </div>
      </div>
    </div>

    <!-- 导航选项卡 -->
    <a-tabs class="center-tabs" type="rounded" @change="handleTabChange">
      <a-tab-pane key="activities" title="动态">
        <div class="tab-content">
          <div class="activity-list">
            <div v-for="(activity, index) in activities" :key="index" class="activity-item">
              <div class="activity-avatar">
                <a-avatar :size="40">
                  <img :src="userInfo.avatar" alt="用户头像" />
                </a-avatar>
              </div>
              <div class="activity-content">
                <div class="activity-header">
                  <span class="activity-user">{{ userInfo.name }}</span>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
                <div class="activity-body">
                  <p v-if="activity.type === 'post'">发布了新内容: {{ activity.content }}</p>
                  <p v-else-if="activity.type === 'comment'">评论了: {{ activity.content }}</p>
                  <p v-else-if="activity.type === 'like'">点赞了: {{ activity.content }}</p>
                </div>
                <div v-if="activity.images && activity.images.length" class="activity-images">
                  <img
                      v-for="(img, imgIndex) in activity.images"
                      :key="imgIndex"
                      :src="img"
                      alt="活动图片"
                      @click="previewImage(activity.images, imgIndex)"
                  />
                </div>
              </div>
            </div>
          </div>
          <a-empty v-if="!activities.length" description="暂无动态" />
        </div>
      </a-tab-pane>

      <a-tab-pane key="collections" title="收藏">
        <div class="tab-content">
          <div class="collection-grid">
            <div v-for="(item, index) in collections" :key="index" class="collection-item">
              <div class="collection-cover">
                <img :src="item.cover" alt="收藏封面" />
                <div class="collection-mask">
                  <a-button type="text" shape="circle" @click="uncollectItem(item.id)">
                    <icon-heart-fill style="color: #f53f3f" />
                  </a-button>
                </div>
              </div>
              <div class="collection-info">
                <h3 class="collection-title">{{ item.title }}</h3>
                <p class="collection-desc">{{ item.description }}</p>
                <div class="collection-meta">
                  <span><icon-eye /> {{ item.views }}</span>
                  <span><icon-heart /> {{ item.likes }}</span>
                </div>
              </div>
            </div>
          </div>
          <a-empty v-if="!collections.length" description="暂无收藏内容" />
        </div>
      </a-tab-pane>

      <a-tab-pane key="posts" title="文章">
        <div class="tab-content">
          <div class="post-list">
            <div v-for="(post, index) in posts" :key="index" class="post-item">
              <div class="post-content">
                <h3 class="post-title">
                  <a :href="`/post/${post.id}`" target="_blank">{{ post.title }}</a>
                </h3>
                <p class="post-excerpt">{{ post.excerpt }}</p>
                <div class="post-meta">
                  <span><icon-calendar /> {{ post.time }}</span>
                  <span><icon-eye /> {{ post.views }}</span>
                  <span><icon-message /> {{ post.comments }}</span>
                  <span><icon-heart /> {{ post.likes }}</span>
                </div>
              </div>
              <div v-if="post.cover" class="post-cover">
                <img :src="post.cover" alt="文章封面" />
              </div>
            </div>
          </div>
          <a-empty v-if="!posts.length" description="暂无发表文章" />
        </div>
      </a-tab-pane>

      <a-tab-pane key="about" title="关于">
        <div class="tab-content about-content">
          <div class="about-section">
            <h3>个人简介</h3>
            <p>{{ userInfo.bio || '这个人很懒，什么都没留下' }}</p>
          </div>

          <div class="about-section">
            <h3>技能标签</h3>
            <div class="skill-tags">
              <a-tag v-for="(tag, index) in userInfo.skills" :key="index" color="arcoblue">
                {{ tag }}
              </a-tag>
            </div>
          </div>

          <div class="about-section">
            <h3>社交链接</h3>
            <div class="social-links">
              <a v-for="(link, index) in userInfo.socialLinks" :key="index" :href="link.url" target="_blank">
                <a-button shape="circle">
                  <component :is="getSocialIcon(link.platform)" />
                </a-button>
              </a>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>

    <!-- 头像上传模态框 -->
    <a-modal
        v-model:visible="avatarModalVisible"
        title="更换头像"
        :footer="false"
        :mask-closable="false"
    >
      <avatar-cropper
          v-if="avatarModalVisible"
          :src="avatarPreview"
          @cropped="handleAvatarCropped"
      />
    </a-modal>

    <!-- 封面上传模态框 -->
    <a-modal
        v-model:visible="coverModalVisible"
        title="更换封面"
        :footer="false"
        :mask-closable="false"
    >
      <cover-uploader
          v-if="coverModalVisible"
          :src="coverPreview"
          @uploaded="handleCoverUploaded"
      />
    </a-modal>

    <!-- 图片预览组件 -->
    <image-previewer
        v-model:visible="previewVisible"
        :images="previewImages"
        :initial-index="previewIndex"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
  IconCamera,
  IconImage,
  IconLocation,
  IconLink,
  IconClockCircle,
  IconHeartFill,
  IconEye,
  IconHeart,
  IconCalendar,
  IconMessage,
  IconGithub,
  IconWechat,
  IconWeibo,
  // IconZhihu,
  IconTwitter, IconZoomIn,
} from '@arco-design/web-vue/es/icon';

// 用户信息
const userInfo = reactive({
  name: 'Raymond',
  avatar: '/public/image/right_img.png',
  coverImage: '/public/image/bg.jpg',
  bio: '后端开发工程师 | Vue、React爱好者 | 技术博客作者',
  location: '上海',
  website: 'https://raymondblog.com',
  joinDate: '2020年5月',
  skills: ['Vue', 'React', 'TypeScript', 'Node.js', 'UI设计'],
  socialLinks: [
    { platform: 'github', url: 'https://github.com/raymond' },
    { platform: 'wechat', url: '#' },
    { platform: 'twitter', url: 'https://twitter.com/raymond' },
  ],
});

// 用户统计数据
const userStats = reactive({
  following: 128,
  followers: 256,
  likes: 1024,
  posts: 32,
});

// 动态数据
const activities = ref([
  {
    type: 'post',
    content: 'Vue 3.2 新特性解析',
    time: '2小时前',
    images: [
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    ],
  },
  {
    type: 'comment',
    content: '这个实现方式很有创意!',
    time: '昨天',
    images: [],
  },
  {
    type: 'like',
    content: 'TypeScript 高级技巧',
    time: '3天前',
    images: [],
  },
]);

// 收藏数据
const collections = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 指南',
    description: '全面介绍Vue3的新特性',
    cover: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    views: 1024,
    likes: 256,
  },
  {
    id: 2,
    title: 'CSS Grid 布局完全指南',
    description: '掌握现代CSS布局技术',
    cover: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    views: 768,
    likes: 128,
  },
]);

// 文章数据
const posts = ref([
  {
    id: 1,
    title: 'Vue 3.2 新特性解析',
    excerpt: '本文将详细介绍Vue 3.2版本带来的新特性和改进...',
    cover: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    time: '2023-10-15',
    views: 1024,
    comments: 32,
    likes: 128,
  },
  {
    id: 2,
    title: 'TypeScript 高级技巧',
    excerpt: '分享一些TypeScript的高级用法和技巧...',
    cover: '',
    time: '2023-09-28',
    views: 768,
    comments: 24,
    likes: 96,
  },
]);

// 模态框状态
const avatarModalVisible = ref(false);
const coverModalVisible = ref(false);
const avatarPreview = ref('');
const coverPreview = ref('');

// 图片预览
const previewVisible = ref(false);
const previewImages = ref<string[]>([]);
const previewIndex = ref(0);

// 获取社交平台图标
const getSocialIcon = (platform: string) => {
  const icons: Record<string, any> = {
    github: IconGithub,
    wechat: IconWechat,
    weibo: IconWeibo,
    zhihu: IconZoomIn,
    twitter: IconTwitter,
  };
  return icons[platform] || null;
};

// 显示头像上传器
const showAvatarUploader = () => {
  avatarPreview.value = userInfo.avatar;
  avatarModalVisible.value = true;
};

// 显示封面上传器
const showCoverUploader = () => {
  coverPreview.value = userInfo.coverImage;
  coverModalVisible.value = true;
};

// 处理头像裁剪完成
const handleAvatarCropped = (avatar: string) => {
  userInfo.avatar = avatar;
  avatarModalVisible.value = false;
};

// 处理封面上传完成
const handleCoverUploaded = (cover: string) => {
  userInfo.coverImage = cover;
  coverModalVisible.value = false;
};

// 预览图片
const previewImage = (images: string[], index: number) => {
  previewImages.value = images;
  previewIndex.value = index;
  previewVisible.value = true;
};

// 取消收藏
const uncollectItem = (id: number) => {
  collections.value = collections.value.filter(item => item.id !== id);
};

// 编辑资料
const editProfile = () => {
  console.log('跳转到编辑资料页面');
};

// 分享
const showShareDialog = () => {
  console.log('显示分享对话框');
};

// 切换标签
const handleTabChange = (key: string) => {
  console.log('切换到标签:', key);
};
</script>

<style lang="scss" scoped>
.personal-center-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .user-profile-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 24px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .cover-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .profile-content {
      position: relative;
      padding: 20px;
      background-color: var(--color-bg-2);
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      .avatar-section {
        position: relative;
        margin-top: -60px;

        .user-avatar {
          border: 4px solid var(--color-bg-2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .avatar-actions {
          position: absolute;
          right: 0;
          bottom: 0;
          display: flex;
          gap: 8px;

          .arco-btn {
            background-color: var(--color-bg-3);

            &:hover {
              background-color: var(--color-bg-4);
            }
          }
        }
      }

      .user-info {
        flex: 1;
        min-width: 300px;

        .user-name {
          margin: 0 0 8px;
          font-size: 24px;
          font-weight: 600;
          color: var(--color-text-1);
        }

        .user-bio {
          margin: 0 0 16px;
          color: var(--color-text-2);
          line-height: 1.5;
        }

        .user-stats {
          display: flex;
          gap: 24px;
          margin-bottom: 16px;

          .stat-item {
            cursor: pointer;
            text-align: center;

            .stat-number {
              font-size: 18px;
              font-weight: 600;
              color: var(--color-text-1);
            }

            .stat-label {
              font-size: 12px;
              color: var(--color-text-3);
            }

            &:hover {
              .stat-number {
                color: var(--color-primary);
              }
            }
          }
        }

        .user-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 13px;
          color: var(--color-text-3);

          .meta-item {
            display: inline-flex;
            align-items: center;
            gap: 4px;

            a {
              color: inherit;

              &:hover {
                color: var(--color-primary);
              }
            }
          }
        }
      }

      .profile-actions {
        display: flex;
        gap: 12px;
        align-self: flex-end;
      }
    }
  }

  .center-tabs {
    :deep(.arco-tabs-content) {
      padding: 0;
    }

    .tab-content {
      padding: 20px 0;
    }
  }

  .activity-list {
    .activity-item {
      display: flex;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid var(--color-border);

      .activity-content {
        flex: 1;

        .activity-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;

          .activity-user {
            font-weight: 500;
            color: var(--color-text-1);
          }

          .activity-time {
            font-size: 12px;
            color: var(--color-text-3);
          }
        }

        .activity-body {
          margin-bottom: 12px;
          color: var(--color-text-2);
        }

        .activity-images {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;

          img {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 4px;
            cursor: pointer;
            transition: transform 0.2s;

            &:hover {
              transform: scale(1.02);
            }
          }
        }
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .collection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;

    .collection-item {
      border-radius: 8px;
      overflow: hidden;
      background-color: var(--color-bg-2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-4px);
      }

      .collection-cover {
        position: relative;
        height: 140px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .collection-mask {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;

          &:hover {
            opacity: 1;
          }
        }
      }

      .collection-info {
        padding: 12px;

        .collection-title {
          margin: 0 0 8px;
          font-size: 16px;
          font-weight: 500;
          color: var(--color-text-1);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .collection-desc {
          margin: 0 0 12px;
          font-size: 13px;
          color: var(--color-text-2);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .collection-meta {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: var(--color-text-3);
        }
      }
    }
  }

  .post-list {
    .post-item {
      display: flex;
      gap: 20px;
      padding: 16px 0;
      border-bottom: 1px solid var(--color-border);

      .post-content {
        flex: 1;

        .post-title {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: 500;

          a {
            color: var(--color-text-1);

            &:hover {
              color: var(--color-primary);
            }
          }
        }

        .post-excerpt {
          margin: 0 0 12px;
          color: var(--color-text-2);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-meta {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: var(--color-text-3);
        }
      }

      .post-cover {
        width: 120px;
        height: 80px;
        border-radius: 4px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .about-content {
    .about-section {
      margin-bottom: 24px;

      h3 {
        margin: 0 0 12px;
        font-size: 16px;
        font-weight: 500;
        color: var(--color-text-1);
      }

      p {
        margin: 0;
        color: var(--color-text-2);
        line-height: 1.6;
      }

      .skill-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .social-links {
        display: flex;
        gap: 12px;

        .arco-btn {
          background-color: var(--color-fill-2);

          &:hover {
            background-color: var(--color-fill-3);
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .personal-center-container {
    padding: 10px;

    .user-profile-card {
      .profile-content {
        .user-info {
          min-width: 100%;
        }

        .profile-actions {
          width: 100%;
          justify-content: flex-end;
        }
      }
    }

    .post-item {
      flex-direction: column;

      .post-cover {
        width: 100% !important;
        height: 160px !important;
        margin-top: 12px;
      }
    }
  }
}
</style>
