<template>
  <div class="contact-list-container">
    <a-list
        :data="filteredContacts"
        :bordered="false"
        class="contact-list"
    >
      <template #item="{ item }">
        <a-list-item
            class="contact-item"
            :class="{ 'active': item.id === activeContact?.id }"
            @click="$emit('select', item)"
        >
          <a-list-item-meta>
            <template #avatar>
              <a-avatar :image-url="item.avatar" />
            </template>
            <template #title>
              <div class="contact-name">{{ item.name }}</div>
            </template>
            <template #description>
              <div class="contact-last-message">{{ item.lastMessage }}</div>
            </template>
          </a-list-item-meta>
          <div class="contact-info">
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
import type { PrivateContact } from '@/types/chat'
import { computed } from 'vue'

const props = defineProps<{
  contacts: PrivateContact[]
  activeContact: PrivateContact | null
}>()

defineEmits(['select'])

const filteredContacts = computed(() => {
  return props.contacts
})
</script>

<style scoped lang="scss">
.contact-list-container {
  height: 100%;
  overflow-y: auto;

  .contact-list {
    padding: 0;

    .contact-item {
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: var(--color-fill-2);
      }

      &.active {
        background-color: var(--color-primary-light-1);
      }

      .contact-name {
        font-weight: 500;
      }

      .contact-last-message {
        color: var(--color-text-3);
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 160px;
      }

      .contact-info {
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
