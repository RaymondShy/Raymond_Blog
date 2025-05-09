<template>
  <div class="group-list-container">
    <a-list
        :data="filteredGroups"
        :bordered="false"
        class="group-list"
    >
      <template #item="{ item }">
        <a-list-item
            class="group-item"
            :class="{ 'active': item.id === activeGroup?.id }"
            @click="$emit('select', item)"
        >
          <a-list-item-meta>
            <template #avatar>
              <a-avatar :image-url="item.avatar" />
            </template>
            <template #title>
              <div class="group-name">{{ item.name }}</div>
            </template>
            <template #description>
              <div class="group-last-message">{{ item.lastMessage }}</div>
            </template>
          </a-list-item-meta>
          <div class="group-info">
            <div class="last-time">{{ item.lastTime }}</div>
            <a-badge
                v-if="item.unreadCount > 0"
                :count="item.unreadCount"
                class="unread-badge"
            />
          </div>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
import type { GroupContact } from '@/types/chat'
import { computed } from 'vue'

const props = defineProps<{
  groups: GroupContact[]
  activeGroup: GroupContact | null
}>()

defineEmits(['select'])

const filteredGroups = computed(() => {
  return props.groups
})
</script>

<style scoped lang="scss">
.group-list-container {
  height: 100%;
  overflow-y: auto;

  .group-list {
    padding: 0;

    .group-item {
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: var(--color-fill-2);
      }

      &.active {
        background-color: var(--color-primary-light-1);
      }

      .group-name {
        font-weight: 500;
      }

      .group-last-message {
        color: var(--color-text-3);
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 160px;
      }

      .group-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .last-time {
          font-size: 12px;
          color: var(--color-text-3);
        }

        .unread-badge {
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
