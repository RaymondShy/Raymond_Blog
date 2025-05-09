<template>
  <div class="chat-view">
    <a-card class="chat-container" :bordered="false">
      <div class="chat-layout">
        <!-- 左侧联系人列表 -->
        <div class="contact-list">
          <div class="search-bar">
            <a-input-search
                v-model="searchKeyword"
                placeholder="搜索联系人"
                allow-clear
            />
          </div>

          <a-tabs v-model:active-key="contactTab" class="contact-tabs">
            <a-tab-pane key="private" title="私聊">
              <PrivateContactList
                  :contacts="privateContacts"
                  :active-contact="activeContact"
                  @select="handleSelectContact"
              />
            </a-tab-pane>
            <a-tab-pane key="group" title="群聊">
              <GroupContactList
                  :groups="groupContacts"
                  :active-group="activeGroup"
                  @select="handleSelectGroup"
              />
            </a-tab-pane>
          </a-tabs>
        </div>

        <!-- 右侧聊天区域 -->
        <div class="chat-area">
          <template v-if="activeChat">
            <ChatHeader :chat="activeChat" />

            <div class="message-list" ref="messageListRef">
              <MessageItem
                  v-for="message in messages"
                  :key="message.id"
                  :message="message"
                  :is-me="message.senderId === currentUserId"
              />
            </div>

            <div class="message-input">
              <a-textarea
                  v-model="inputMessage"
                  placeholder="输入消息..."
                  :auto-size="{
                  minRows: 1,
                  maxRows: 4
                }"
                  @press-enter="handleSendMessage"
              />
              <div class="input-actions">
                <a-space>
                  <a-button type="text" size="small">
                    <icon-image />
                  </a-button>
                  <a-button type="text" size="small">
                    <icon-file />
                  </a-button>
                  <a-button
                      type="primary"
                      size="small"
                      @click="handleSendMessage"
                      :disabled="!inputMessage.trim()"
                  >
                    发送
                  </a-button>
                </a-space>
              </div>
            </div>
          </template>

          <div v-else class="empty-chat">
            <icon-message />
            <p>请选择聊天</p>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import type {
  PrivateContact,
  GroupContact,
  ChatMessage,
  ChatType
} from '@/types/chat'
import PrivateContactList from '@/components/PrivateContactList.vue'
import GroupContactList from '@/components/GroupContactList.vue'
import ChatHeader from '@/components/ChatHeader.vue'
import MessageItem from '@/components/MessageItem.vue'

const contactTab = ref<'private' | 'group'>('private')
const searchKeyword = ref('')
const activeContact = ref<PrivateContact | null>(null)
const activeGroup = ref<GroupContact | null>(null)
const inputMessage = ref('')
const messageListRef = ref<HTMLElement | null>(null)

// 模拟数据
const currentUserId = ref('user1')
const privateContacts = ref<PrivateContact[]>([
  {
    id: 'user2',
    name: '张三',
    avatar: '/public/image/bg.jpg',
    lastMessage: '你好，请问产品什么时候发货？',
    lastTime: '14:30',
    unreadCount: 2
  },
  {
    id: 'user3',
    name: '李四',
    avatar: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    lastMessage: '明天一起吃饭吗？',
    lastTime: '昨天',
    unreadCount: 0
  }
])

const groupContacts = ref<GroupContact[]>([
  {
    id: 'group1',
    name: 'VIP客户群',
    avatar: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    lastMessage: '李四: 大家觉得新产品怎么样？',
    lastTime: '09:15',
    unreadCount: 5,
    memberCount: 12
  }
])

const messages = ref<ChatMessage[]>([])
const activeChat = ref<PrivateContact | GroupContact | null>(null)

// 选择私聊联系人
const handleSelectContact = (contact: PrivateContact) => {
  activeContact.value = contact
  activeGroup.value = null
  activeChat.value = contact
  loadMessages(contact.id, 'private')
}

// 选择群聊
const handleSelectGroup = (group: GroupContact) => {
  activeGroup.value = group
  activeContact.value = null
  activeChat.value = group
  loadMessages(group.id, 'group')
}

// 加载消息记录
const loadMessages = (chatId: string, type: ChatType) => {
  // 模拟API调用
  setTimeout(() => {
    messages.value = [
      {
        id: 'msg1',
        chatId,
        chatType: type,
        senderId: 'user2',
        senderName: '张三',
        content: '你好，请问产品什么时候发货？',
        timestamp: '2023-05-15 14:30:22',
        status: 'read'
      },
      {
        id: 'msg2',
        chatId,
        chatType: type,
        senderId: 'user1',
        senderName: '我',
        content: '预计明天发货，请注意查收',
        timestamp: '2023-05-15 14:32:45',
        status: 'read'
      },
      {
        id: 'msg3',
        chatId,
        chatType: type,
        senderId: 'user2',
        senderName: '张三',
        content: '好的，谢谢',
        timestamp: '2023-05-15 14:33:10',
        status: 'read'
      }
    ]

    scrollToBottom()
  }, 300)
}

// 发送消息
const handleSendMessage = () => {
  if (!inputMessage.value.trim() || !activeChat.value) return

  const newMessage: ChatMessage = {
    id: `msg-${Date.now()}`,
    chatId: activeChat.value.id,
    chatType: activeContact.value ? 'private' : 'group',
    senderId: currentUserId.value,
    senderName: '我',
    content: inputMessage.value,
    timestamp: new Date().toISOString(),
    status: 'sending'
  }

  messages.value.push(newMessage)
  inputMessage.value = ''

  scrollToBottom()

  // 模拟发送成功
  setTimeout(() => {
    const index = messages.value.findIndex(msg => msg.id === newMessage.id)
    if (index !== -1) {
      messages.value[index].status = 'sent'
    }
  }, 800)
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight
    }
  })
}

// 监听消息变化自动滚动
watch(messages, () => {
  scrollToBottom()
}, { deep: true })

// 初始化选中第一个联系人
onMounted(() => {
  if (privateContacts.value.length > 0) {
    handleSelectContact(privateContacts.value[0])
  }
})
</script>

<style scoped lang="scss">
.chat-view {
  height: 100%;
  background-color: var(--color-bg-2);

  .chat-container {
    height: 100%;
    padding: 0;

    :deep(.arco-card-body) {
      height: 100%;
      padding: 0;
    }
  }

  .chat-layout {
    display: flex;
    height: 100%;
    min-height: 600px;
  }

  .contact-list {
    width: 280px;
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;

    .search-bar {
      padding: 12px;
      border-bottom: 1px solid var(--color-border);
    }

    .contact-tabs {
      flex: 1;
      overflow: hidden;

      :deep(.arco-tabs-content) {
        height: calc(100% - 46px);
        padding: 0;
      }

      :deep(.arco-tabs-pane) {
        height: 100%;
        overflow: hidden;
      }
    }
  }

  .chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .message-list {
      flex: 1;
      padding: 12px 16px;
      overflow-y: auto;
      background-color: var(--color-fill-2);
    }

    .message-input {
      padding: 12px;
      border-top: 1px solid var(--color-border);
      background-color: var(--color-bg-2);

      .input-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
      }
    }

    .empty-chat {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--color-text-3);

      .arco-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
