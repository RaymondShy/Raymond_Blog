<template>
  <div class="gvb_breadcrumb">
    <div class="breadcrumb_content">
      <a-breadcrumb>
        <a-breadcrumb-item
            v-for="(item, index) in breadcrumbItems"
            :key="item.path"
            @click="handleClick(item, index)"
        >
          <template v-if="item.icon" #separator>
            <icon :icon="item.icon" class="breadcrumb-icon" />
          </template>
          <span :class="[
            'breadcrumb-item-text',
            index === breadcrumbItems.length - 1 ? 'current-page' : ''
          ]">
            {{ item.title }}
          </span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="breadcrumb_actions" v-if="showActions || $slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { RouteMeta, RouteRecordNormalized } from 'vue-router';

interface MetaType extends RouteMeta {
  title: string;
  icon?: string;
  hideInBreadcrumb?: boolean; // 新增隐藏某些面包屑项的功能
}

interface BreadcrumbItem {
  title: string;
  path: string;
  icon?: string;
}

const props = withDefaults(defineProps<{
  showActions?: boolean;
  hideHome?: boolean; // 新增是否隐藏首页
}>(), {
  showActions: false,
  hideHome: false
});

const route = useRoute();
const router = useRouter();

const breadcrumbItems = computed(() => {
  const matched = route.matched.filter(item =>
      !(item.meta as MetaType)?.hideInBreadcrumb
  );

  // 如果配置了隐藏首页，则过滤掉首页
  if (props.hideHome && matched.length > 1) {
    return matched.slice(1).map(transformRouteToItem);
  }

  return matched.map(transformRouteToItem);
});

function transformRouteToItem(item: RouteRecordNormalized): BreadcrumbItem {
  return {
    title: (item.meta as MetaType).title,
    path: item.path,
    icon: (item.meta as MetaType).icon
  };
}

const handleClick = (item: BreadcrumbItem, index: number) => {
  // 不允许点击当前页
  if (index === breadcrumbItems.value.length - 1) return;

  // 如果是外链，使用window.open
  if (item.path.startsWith('http')) {
    window.open(item.path, '_blank');
  } else {
    router.push(item.path);
  }
};
</script>
<style lang="scss" scoped>
.gvb_breadcrumb {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 12px;

  .breadcrumb_content {
    flex: 1;
    min-width: 0; // 防止内容溢出

    :deep(.arco-breadcrumb) {
      display: flex;
      align-items: center;
      font-size: 15px;
      background: none;
      padding: 0;
      flex-wrap: wrap;

      .arco-breadcrumb-item {
        display: inline-flex;
        align-items: center;
        color: var(--color-text-2);
        font-size: 15px;
        padding: 0 4px;
        cursor: pointer;
        transition: color 0.2s;

        &:hover:not(:last-child) {
          color: var(--color-primary);

          .breadcrumb-item-text {
            color: var(--color-primary);
          }
        }

        .breadcrumb-icon {
          font-size: 16px;
          margin-right: 4px;
          color: inherit;
        }

        .breadcrumb-item-text {
          color: inherit;
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
          display: inline-block;
        }

        &:last-child {
          cursor: default;
          color: var(--color-text-1);

          .breadcrumb-item-text {
            font-weight: 500;
            color: var(--color-text-1);
          }
        }
      }

      .arco-breadcrumb-separator {
        color: var(--color-border-2);
        margin: 0 6px;
        font-size: 14px;
      }
    }
  }

  .breadcrumb_actions {
    flex-shrink: 0;
    display: flex;
    gap: 8px;
    align-items: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    .breadcrumb_actions {
      width: 100%;
      justify-content: flex-end;
    }
  }
}
</style>
