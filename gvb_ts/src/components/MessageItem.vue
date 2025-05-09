<template>
  <div class="message-item" :class="{ 'is-me': isMe }">
    <div class="message-avatar" v-if="!isMe">
      <a-avatar :image-url="getAvatarUrl(message.senderId)" size="small" />
    </div>

    <div class="message-content">
      <div class="message-sender" v-if="!isMe">
        {{ message.senderName }}
      </div>
      <div class="message-bubble" :class="{ 'me': isMe }">
        <div class="message-text">{{ message.content }}</div>
        <div class="message-time">
          {{ formatTime(message.timestamp) }}
          <a-tooltip v-if="isMe" :content="getStatusText(message.status)">
            <icon-check
                class="status-icon"
                :class="message.status"
            />
          </a-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ChatMessage } from '@/types/chat'
import { formatTime } from '@/utils/date'

const props = defineProps<{
  message: ChatMessage
  isMe: boolean
}>()

const getAvatarUrl = (userId: string) => {
  // 实际项目中应该从用户数据获取
  return '/public/image/bg.jpg'
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'sending': return '发送中'
    case 'sent': return '已发送'
    case 'read': return '已读'
    default: return status
  }
}
</script>

<style scoped lang="scss">
.message-item {
  display: flex;
  margin-bottom: 16px;

  &.is-me {
    flex-direction: row-reverse;

    .message-content {
      align-items: flex-end;
    }

    .message-bubble {
      background-color: var(--color-primary-light-1);
      border-radius: 8px 0 8px 8px;
    }
  }

  .message-avatar {
    margin-right: 12px;
  }

  .message-content {
    display: flex;
    flex-direction: column;
    max-width: 70%;
  }

  .message-sender {
    font-size: 12px;
    color: var(--color-text-3);
    margin-bottom: 4px;
  }

  .message-bubble {
    background-color: var(--color-bg-3);
    padding: 8px 12px;
    border-radius: 0 8px 8px 8px;
    position: relative;

    .message-text {
      word-break: break-word;
      white-space: pre-wrap;
    }

    .message-time {
      font-size: 11px;
      color: var(--color-text-3);
      text-align: right;
      margin-top: 4px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .status-icon {
        margin-left: 4px;
        font-size: 12px;

        &.sending {
          color: var(--color-text-3);
        }

        &.sent {
          color: var(--color-text-3);
        }

        &.read {
          color: var(--color-primary-6);
        }
      }
    }
  }
}
</style>
