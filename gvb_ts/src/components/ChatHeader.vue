<template>
  <div class="chat-header">
    <div class="chat-info">
      <a-avatar :image-url="chat.avatar" size="medium" />
      <div class="chat-name">
        <div class="name">{{ chat.name }}</div>
        <div class="status" v-if="'memberCount' in chat">
          {{ chat.memberCount }}人
        </div>
      </div>
    </div>

    <div class="chat-actions">
      <a-space>
        <a-tooltip content="查找聊天记录">
          <a-button type="text" size="small">
            <icon-search />
          </a-button>
        </a-tooltip>
        <a-tooltip content="更多操作">
          <a-button type="text" size="small">
            <icon-more />
          </a-button>
        </a-tooltip>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup>

import type {GroupContact, PrivateContact} from "@/types/chat.ts";

defineProps<{
  chat: PrivateContact | GroupContact
}>()
</script>

<style scoped lang="scss">
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);

  .chat-info {
    display: flex;
    align-items: center;

    .chat-name {
      margin-left: 12px;

      .name {
        font-weight: 500;
      }

      .status {
        font-size: 12px;
        color: var(--color-text-3);
      }
    }
  }

  .chat-actions {
    display: flex;
  }
}
</style>
