// 私聊联系人
export interface PrivateContact {
    id: string
    name: string
    avatar: string
    lastMessage: string
    lastTime: string
    unreadCount: number
}

// 群聊联系人
export interface GroupContact {
    id: string
    name: string
    avatar: string
    lastMessage: string
    lastTime: string
    unreadCount: number
    memberCount: number
}

// 聊天消息
export interface ChatMessage {
    id: string
    chatId: string
    chatType: ChatType
    senderId: string
    senderName: string
    content: string
    timestamp: string
    status: 'sending' | 'sent' | 'read' | 'failed'
}

export type ChatType = 'private' | 'group'
