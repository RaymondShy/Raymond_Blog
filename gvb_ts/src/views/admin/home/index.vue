<template>
  <div class="dashboard-creative">
    <!-- 顶部欢迎区+AI入口+数据总览横条 -->
    <div class="creative-welcome">
      <div class="welcome-main">
        <h2>Hi, Codecify 管理员 👋</h2>
        <div class="welcome-sub">今天是 {{ todayStr }}，祝你高效愉快！</div>
      </div>
      <div class="welcome-ai">
        <a-button type="primary" size="large" @click="openAI = true">
          <icon-robot style="margin-right:8px" />AI 智慧问答
        </a-button>
      </div>
    </div>

    <!-- 主区两栏聚合布局 -->
    <div class="main-flex">
      <div class="main-left">
        <section class="info-block info-quick">
          <div class="info-title"><icon-bulb /> 快捷操作</div>
          <div class="info-actions">
            <a-button type="outline" icon="plus">新建文章</a-button>
            <a-button type="outline" icon="user">用户管理</a-button>
            <a-button type="outline" icon="settings">系统设置</a-button>
            <a-button type="outline" icon="edit">内容审核</a-button>
            <a-button type="outline" icon="bulb">AI推荐</a-button>
          </div>
        </section>
        <section class="info-block info-recent">
          <div class="info-title"><icon-clock-circle /> 最近常用</div>
          <ul class="info-list">
            <li v-for="(item, idx) in recentList" :key="idx">{{ item }}</li>
          </ul>
        </section>
        <section class="info-block info-todo">
          <div class="info-title"><icon-file /> 待办事项</div>
          <ul class="info-list">
            <li v-for="(item, idx) in todos" :key="idx">
              <a-checkbox v-model="item.done">{{ item.content }}</a-checkbox>
            </li>
          </ul>
        </section>
        <section class="info-block info-ai">
          <div class="info-title"><icon-bulb /> AI 智能推荐</div>
          <ul class="info-list">
            <li v-for="(item, idx) in smartList" :key="idx">{{ item }}</li>
          </ul>
        </section>
      </div>
      <div class="main-right">
        <!-- 创建新的容器包裹个人资料和擅长技术 -->
        <div class="profile-expert-container">
          <section class="info-block info-profile">
            <div class="profile-bg"></div>
            <div class="profile-main">
              <img class="profile-avatar" src="https://api.dicebear.com/7.x/identicon/svg?seed=admin" alt="avatar" />
              <div class="profile-info">
                <div class="profile-row">
                  <span class="profile-nick">Raymond</span>
                  <span class="profile-role">管理员</span>
                  <span class="profile-status online"></span>
                </div>
                <div class="profile-row"><icon-email /> admin@example.com</div>
                <div class="profile-row"><icon-idcard /> 技术部</div>
                <div class="profile-row"><icon-clock-circle /> 注册于 2023-01-01</div>
                <div class="profile-row profile-sign">"热爱技术，持续创新。"</div>
                <a-button type="outline" size="small" class="profile-edit">编辑资料</a-button>
                                <div class="badges-row">
                                  <a-tooltip content="活跃之星：连续活跃30天">
                                    <div class="badge-circle badge-active"><icon-bulb /></div>
                                  </a-tooltip>
                                  <a-tooltip content="优质作者：优质文章10篇">
                                    <div class="badge-circle badge-author"><icon-file /></div>
                                  </a-tooltip>
                                  <a-tooltip content="AI达人：AI问答100次">
                                    <div class="badge-circle badge-ai"><icon-robot /></div>
                                  </a-tooltip>
                                </div>
              </div>
<!--              <div class="profile-badges">-->
<!--                <div class="badges-row">-->
<!--                  <a-tooltip content="活跃之星：连续活跃30天">-->
<!--                    <div class="badge-circle badge-active"><icon-bulb /></div>-->
<!--                  </a-tooltip>-->
<!--                  <a-tooltip content="优质作者：优质文章10篇">-->
<!--                    <div class="badge-circle badge-author"><icon-file /></div>-->
<!--                  </a-tooltip>-->
<!--                  <a-tooltip content="AI达人：AI问答100次">-->
<!--                    <div class="badge-circle badge-ai"><icon-robot /></div>-->
<!--                  </a-tooltip>-->
<!--                </div>-->
<!--                <div class="profile-middle">-->
<!--                  <div class="profile-motto">"让代码改变世界"</div>-->
<!--                  <div class="profile-growth">成长值 <span class="growth-num">1280</span></div>-->
<!--                </div>-->
<!--              </div>-->
            </div>
          </section>
          <section class="info-block info-expert">
            <div class="info-title"><icon-star /> 擅长技术</div>
            <div class="expert-tech-list">
              <div class="expert-tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" />
                <span>Vue3</span>
                <div class="expert-level">
                  <div class="expert-level-bar" style="width: 90%"></div>
                </div>
              </div>
              <div class="expert-tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
                <span>TypeScript</span>
                <div class="expert-level">
                  <div class="expert-level-bar" style="width: 85%"></div>
                </div>
              </div>
              <div class="expert-tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
                <span>Node.js</span>
                <div class="expert-level">
                  <div class="expert-level-bar" style="width: 80%"></div>
                </div>
              </div>
              <div class="expert-tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
                <span>React</span>
                <div class="expert-level">
                  <div class="expert-level-bar" style="width: 75%"></div>
                </div>
              </div>
              <div class="expert-tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" />
                <span>Go</span>
                <div class="expert-level">
                  <div class="expert-level-bar" style="width: 70%"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section class="info-block info-calendar">
          <div class="info-title"><icon-calendar /> 活跃日历</div>
          <div class="gh-calendar">
            <div class="gh-calendar-weeks">
              <div
                  v-for="(week, wIdx) in calendarWeeks"
                  :key="wIdx"
                  class="gh-calendar-week"
              >
                <a-tooltip
                    v-for="(day, dIdx) in week"
                    :key="dIdx"
                    :content="`${day.date} 活跃：${day.count}`"
                >
                  <div
                      class="gh-calendar-day"
                      :style="{ background: getCalendarColor(day.count) }"
                  ></div>
                </a-tooltip>
              </div>
            </div>
            <div class="gh-calendar-legend">
              <span>少</span>
              <span
                  v-for="level in 5"
                  :key="level"
                  class="gh-calendar-legend-box"
                  :style="{ background: getCalendarColor(level) }"
              ></span>
              <span>多</span>
            </div>
          </div>
        </section>
        <section class="info-block info-tech">
          <div class="info-title"><icon-apps /> 项目技术栈</div>
          <div class="tech-list">
            <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" />Vue3</div>
            <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />TypeScript</div>
            <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />Node.js</div>
            <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" />MySQL</div>
            <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />Docker</div>
          </div>
        </section>
        <!-- 系统公告模块（移动到日历和技术栈下方） -->
        <section class="info-block info-notice">
          <div class="info-title"><icon-message /> 系统公告</div>
          <ul class="info-list">
            <li v-for="(item, idx) in notices" :key="idx">
              <a-tag color="arcoblue" size="small">公告</a-tag>
              <span class="notice-content">{{ item }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- AI智慧问答 Modal弹窗 -->
    <a-modal v-model:visible="openAI" :width="isMobile ? '98vw' : 480" :footer="false" :closable="true" :mask-closable="true" :title="'AI 智慧问答'" class="ai-modal" :body-style="{padding: '0'}">
      <div class="ai-float-header">
        <a-tabs v-model:active-key="aiModel" type="rounded" size="small">
          <a-tab-pane key="deepseek" title="DeepSeek" />
          <a-tab-pane key="chatgpt" title="ChatGPT" />
        </a-tabs>
        <a-button type="text" size="mini" @click="clearAIHistory">清空</a-button>
      </div>
      <div class="ai-float-body">
        <div class="ai-chat-area">
          <div v-for="(msg, idx) in aiHistory" :key="idx" :class="['ai-bubble', msg.role]">
            <span v-if="msg.role==='user'">🙋‍♂️</span>
            <span v-else><icon-robot /></span>
            <span class="ai-bubble-content">{{ msg.content }}</span>
          </div>
          <div v-if="aiLoading" class="ai-bubble bot loading">
            <icon-robot />
            <span class="ai-bubble-content"><a-spin size="small" /> AI正在思考...</span>
          </div>
        </div>
      </div>
      <div class="ai-float-footer">
        <a-input ref="aiInputRef" v-model="aiInput" placeholder="请输入您的问题..." allow-clear @pressEnter="sendAIMessage" />
        <a-button type="primary" :loading="aiLoading" @click="sendAIMessage" style="margin-left:8px;">发送</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import {
  IconFile,
  IconUser,
  IconMessage,
  IconSettings,
  IconEdit,
  IconPlus,
  IconBulb,
  IconRobot,
  IconClockCircle,
  IconCalendar,
  IconApps,
  IconEmail,
  IconIdcard,
  IconStar
} from '@arco-design/web-vue/es/icon'

const todayStr = computed(() => {
  const d = new Date()
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
})

const notices = ref([
  '系统将于本周末凌晨进行维护升级，敬请关注！',
  '新版本已上线，欢迎体验。',
  '请及时备份重要数据。'
])

const todos = ref([
  { content: '审核新用户申请', done: false },
  { content: '回复用户反馈', done: false },
  { content: '更新系统公告', done: false },
  { content: '备份数据库', done: false }
])

const smartList = ref([
  '检测到有3条待办事项未处理',
  'AI建议：定期备份数据库',
  '本周内容发布量高于上周',
  '有2条用户反馈待回复'
])

const recentList = ref([
  '10:00 登录系统',
  '10:05 新建文章《Vue3 新特性》',
  '10:10 审核用户"张三"',
  '10:15 回复评论',
  '10:20 系统设置更新'
])

const aiModel = ref('deepseek')
const aiInput = ref('')
const aiHistory = ref([
  { role: 'bot', content: '您好，我是AI助手，有什么可以帮您？' }
])
const aiLoading = ref(false)
const aiInputRef = ref()
const openAI = ref(false)

// 响应式判断是否为移动端
const isMobile = ref(false)
function checkMobile() {
  isMobile.value = window.innerWidth < 700
}
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})

function clearAIHistory() {
  aiHistory.value = [
    { role: 'bot', content: '您好，我是AI助手，有什么可以帮您？' }
  ]
}

async function sendAIMessage() {
  if (!aiInput.value || aiLoading.value) return
  aiHistory.value.push({ role: 'user', content: aiInput.value })
  const userMsg = aiInput.value
  aiInput.value = ''
  aiLoading.value = true
  // 预留API调用位置
  let aiReply = ''
  if (aiModel.value === 'deepseek') {
    // await deepseekApi(userMsg)
    aiReply = `DeepSeek已收到："${userMsg}"`
  } else {
    // await chatgptApi(userMsg)
    aiReply = `ChatGPT已收到："${userMsg}"`
  }
  setTimeout(() => {
    aiHistory.value.push({ role: 'bot', content: aiReply })
    aiLoading.value = false
    nextTick(() => {
      aiInputRef.value?.focus()
    })
  }, 1000)
}

// mock活跃日历数据
const calendarData = ref([] as { date: string, count: number }[])
function getYearCalendarData() {
  const today = new Date()
  const days = 365
  const arr = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    arr.push({
      date: d.toISOString().slice(0, 10),
      count: Math.floor(Math.random() * 5)
    })
  }
  return arr
}
calendarData.value = getYearCalendarData()
const calendarWeeks = computed(() => {
  const weeks = []
  let week = []
  for (let i = 0; i < calendarData.value.length; i++) {
    if (i % 7 === 0 && week.length) {
      weeks.push(week)
      week = []
    }
    week.push(calendarData.value[i])
  }
  if (week.length) weeks.push(week)
  return weeks
})
function getCalendarColor(count: number) {
  const colors = [
    '#e8f3ff',
    '#b2d5ff',
    '#7bb6fa',
    '#409eff',
    '#165DFF'
  ]
  if (count >= 4) return colors[4]
  return colors[count]
}
</script>

<style scoped>
.dashboard-creative {
  min-height: 100vh;
  background: linear-gradient(120deg, #fafdff 0%, #e8f3ff 100%);
  padding-bottom: 40px;
  position: relative;
}
/* 点阵背景 */
.dashboard-creative::before {
  content: '';
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2" fill="%23e8f3ff"/><circle cx="38" cy="38" r="2" fill="%23e8f3ff"/></svg>') repeat;
  opacity: 0.13;
  z-index: 0;
  pointer-events: none;
}
.creative-welcome {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #e8f3ff 0%, #fff 100%);
  border-radius: 0 0 32px 32px;
  box-shadow: 0 2px 12px rgba(22,93,255,0.04);
  padding: 40px 48px 32px 48px;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
/* 顶部波浪SVG */
.creative-welcome::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -8px; height: 48px;
  background: url('data:image/svg+xml;utf8,<svg width="100%" height="48" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C120 48 360 48 720 24C1080 0 1320 0 1440 24V48H0V24Z" fill="%23165DFF" fill-opacity="0.08"/></svg>') repeat-x;
  opacity: 0.18;
  pointer-events: none;
}
.welcome-main h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: #165DFF;
  display: flex;
  align-items: center;
  gap: 10px;
}
/* 动态emoji动画 */
.welcome-main h2 .emoji-wave {
  display: inline-block;
  animation: wave-hand 1.6s infinite;
  transform-origin: 70% 70%;
}
@keyframes wave-hand {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(18deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(18deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(12deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
.welcome-sub {
  color: #888;
  font-size: 18px;
  margin-top: 12px;
}
.main-flex {
  display: flex;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 32px;
}
.main-left { flex: 2; display: flex; flex-direction: column; gap: 22px;}
.main-right { flex: 1; display: flex; flex-direction: column; gap: 22px;}
.info-block { background: linear-gradient(90deg, #fafdff 60%, #e8f3ff 100%); border-radius: 18px; min-height: 64px; box-shadow: none; padding: 18px 18px 10px 18px; position: relative; transition: background 0.2s;}
.info-block:hover { background: linear-gradient(90deg, #e8f3ff 60%, #fafdff 100%);}
.info-title { font-size: 17px; font-weight: 700; color: #165DFF; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;}
.info-actions { display: flex; gap: 12px; flex-wrap: wrap;}
.info-list { list-style: none; padding: 0; margin: 0;}
.info-list li { font-size: 15px; color: #444; padding: 7px 0; display: flex; align-items: center; gap: 8px;}
.notice-content { color: #555; }
.tech-list { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 8px;}
.tech-item { display: flex; align-items: center; gap: 6px; background: #fafdff; border-radius: 8px; padding: 6px 12px; font-size: 15px; color: #165DFF; box-shadow: 0 1px 4px #165DFF11;}
.tech-item img { width: 22px; height: 22px;}
/* AI助手Modal弹窗美化+动画 */
.ai-modal .arco-modal-content {
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(22,93,255,0.13);
  animation: modal-zoom-in 0.4s cubic-bezier(.68,-0.55,.27,1.55);
}
@keyframes modal-zoom-in {
  0% { opacity: 0; transform: scale(0.85); }
  100% { opacity: 1; transform: scale(1); }
}
.ai-modal .arco-modal-header {
  background: linear-gradient(90deg, #e8f3ff 0%, #fafdff 100%);
  border-bottom: 1px solid #f0f0f0;
  padding: 32px 32px 16px 32px;
  position: relative;
}
/* AI插画 */
.ai-modal .arco-modal-header::after {
  content: '';
  position: absolute;
  right: 32px; top: 8px; width: 56px; height: 56px;
  background: url('https://cdn.jsdelivr.net/gh/arco-design/arco-design-pro@main/public/ai-robot.svg') no-repeat center/contain;
  opacity: 0.18;
  pointer-events: none;
}
.ai-modal .arco-modal-title {
  font-size: 22px;
  font-weight: 700;
  color: #165DFF;
}
.ai-float-header {
  padding: 0 18px 0 18px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #165DFF;
  background: none;
  border-bottom: none;
}
.ai-float-body {
  flex: 1;
  overflow-y: auto;
  padding: 18px 24px 0 24px;
  background: linear-gradient(135deg, #fafdff 60%, #e8f3ff 100%);
  max-height: 260px;
  position: relative;
}
.ai-chat-area {
  min-height: 40px;
  max-height: 220px;
  overflow-y: auto;
  padding-right: 2px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ai-bubble {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0;
  animation: bubble-in 0.4s cubic-bezier(.68,-0.55,.27,1.55);
}
@keyframes bubble-in {
  0% { opacity: 0; transform: scale(0.8) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
.ai-bubble.user {
  justify-content: flex-end;
}
.ai-bubble.bot {
  justify-content: flex-start;
}
.ai-bubble-content {
  display: inline-block;
  max-width: 80%;
  background: #f4f6fa;
  border-radius: 16px;
  padding: 12px 18px;
  color: #333;
  font-size: 15px;
  margin-left: 8px;
  word-break: break-all;
  box-shadow: 0 1px 4px rgba(22,93,255,0.04);
  animation: bubble-pop 0.5s cubic-bezier(.68,-0.55,.27,1.55);
}
@keyframes bubble-pop {
  0% { transform: scale(0.7); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.ai-bubble.user .ai-bubble-content {
  background: linear-gradient(90deg, #fffbe6 0%, #fff 100%);
  color: #FF7D00;
  margin-left: 0;
  margin-right: 8px;
  border: 1px solid #ffe7ba;
}
.ai-bubble.bot .ai-bubble-content {
  background: linear-gradient(90deg, #e8f3ff 0%, #fafdff 100%);
  color: #165DFF;
  border: 1px solid #b2d5ff;
}
.ai-float-footer {
  padding: 18px 24px 24px 24px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 0 0 28px 28px;
}
.ai-float-footer .arco-input {
  border-radius: 16px;
  font-size: 15px;
  padding: 8px 14px;
}
.ai-float-footer .arco-btn {
  border-radius: 16px;
  font-size: 15px;
  padding: 0 18px;
  background: linear-gradient(90deg, #165DFF 0%, #4fc3f7 100%);
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(22,93,255,0.10);
  transition: background 0.2s, box-shadow 0.2s;
}
.ai-float-footer .arco-btn[loading] {
  background: linear-gradient(90deg, #b2d5ff 0%, #e8f3ff 100%);
  color: #165DFF;
}
/* AI正在输入动画 */
.ai-typing {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-top: 8px;
  margin-left: 8px;
  height: 18px;
}
.ai-typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #165DFF;
  opacity: 0.5;
  animation: typing-bounce 1.2s infinite both;
}
.ai-typing-dot:nth-child(2) { animation-delay: 0.2s; }
.ai-typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes typing-bounce {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
  40% { transform: scale(1.2); opacity: 1; }
}
@media (max-width: 900px) {
  .main-flex { flex-direction: column; gap: 12px; padding-top: 12px;}
  .main-left, .main-right { gap: 12px; }
}
.gh-calendar { margin-top: 8px; }
.gh-calendar-weeks { display: flex; gap: 2px; }
.gh-calendar-week { display: flex; flex-direction: column; gap: 2px; }
.gh-calendar-day {
  width: 14px; height: 14px; border-radius: 3px;
  background: #e8f3ff; transition: background 0.2s;
  cursor: pointer;
}
.gh-calendar-legend { display: flex; align-items: center; gap: 4px; margin-top: 8px; font-size: 12px; color: #888;}
.gh-calendar-legend-box { width: 14px; height: 14px; border-radius: 3px; display: inline-block;}
@media (max-width: 900px) {
  .gh-calendar-weeks { gap: 1px; }
  .gh-calendar-day, .gh-calendar-legend-box { width: 10px; height: 10px; }
}
.profile-expert-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.profile-expert-container .info-block {
  flex: 1;
  margin-bottom: 0;
}
.info-profile {
  flex: 1.2;
}
.info-expert {
  flex: 0.8;
  background: linear-gradient(135deg, #e8f3ff 60%, #fafdff 100%);
  padding: 20px;
}
.info-block.info-profile {
  position: relative;
  background: linear-gradient(135deg, #e8f3ff 60%, #fafdff 100%);
  overflow: hidden;
  min-height: 120px;
  padding: 24px 18px 18px 18px;
}
.profile-bg {
  position: absolute;
  right: -40px; top: -40px;
  width: 120px; height: 120px;
  background: radial-gradient(circle at 40% 40%, #b2d5ff 0%, #e8f3ff 100%);
  opacity: 0.35;
  z-index: 0;
}
.profile-main {
  display: flex;
  gap: 18px;
  position: relative;
  z-index: 1;
}
.profile-avatar {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #e8f3ff;
  border: 3px solid #b2d5ff;
  object-fit: cover;
  box-shadow: 0 2px 8px #165DFF22;
}
.profile-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 110px;
  margin: 0 10px;
}
.profile-motto {
  font-size: 14px;
  color: #888;
  font-style: italic;
  text-align: center;
}
.profile-growth {
  font-size: 13px;
  color: #409eff;
  background: #e8f3ff;
  border-radius: 8px;
  padding: 2px 10px;
  margin-top: 2px;
}
.growth-num {
  font-weight: 700;
  color: #165DFF;
}
.profile-info {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.profile-row {
  font-size: 15px;
  color: #165DFF;
  display: flex;
  align-items: center;
  gap: 10px;
}
.profile-nick {
  font-size: 18px;
  font-weight: 700;
  color: #165DFF;
}
.profile-role {
  background: #165DFF;
  color: #fff;
  border-radius: 8px;
  padding: 2px 10px;
  font-size: 13px;
  margin-left: 6px;
}
.profile-status.online {
  width: 10px; height: 10px; border-radius: 50%;
  background: #00b96b; display: inline-block; margin-left: 6px;
  box-shadow: 0 0 6px #00b96b88;
}
.profile-sign {
  color: #888;
  font-style: italic;
  margin-top: 2px;
}
.profile-edit {
  margin-top: 6px;
  border-radius: 8px;
  font-size: 13px;
  padding: 0 12px;
}
.profile-badges {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  min-width: 110px;
  margin-left: 18px;
}
.badges-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}
.badge-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #fafdff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 1px 6px #165DFF11;
  border: 2px solid #e8f3ff;
  transition: box-shadow 0.2s, border 0.2s;
  cursor: pointer;
  position: relative;
}
.badge-circle.badge-active { background: #e6f7ff; border-color: #409eff; color: #409eff;}
.badge-circle.badge-author { background: #fffbe6; border-color: #ffb800; color: #ffb800;}
.badge-circle.badge-ai { background: #f0e6ff; border-color: #722ed1; color: #722ed1;}
.badge-circle:hover {
  box-shadow: 0 2px 12px #165DFF33;
  border-color: #165DFF;
}
.badges-info {
  font-size: 12px;
  color: #888;
  gap: 6px;
  background: #fafdff;
  color: #165DFF;
  border-radius: 8px;
  font-size: 13px;
  padding: 4px 10px;
  box-shadow: 0 1px 4px #165DFF11;
  cursor: pointer;
  transition: background 0.2s;
}
.badge-item:hover {
  background: #e8f3ff;
}
@media (max-width: 1200px) {
  .profile-expert-container {
    flex-direction: column;
    gap: 20px;
  }

  .profile-expert-container .info-block {
    width: 100%;
  }
}
@media (max-width: 900px) {
  .profile-expert-container {
    gap: 16px;
  }

  .profile-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .profile-badges {
    flex-direction: row;
    align-items: center;
    margin-left: 0;
    margin-top: 10px;
  }

  .profile-middle {
    min-width: 0;
    margin: 0;
  }
}
.expert-tech-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}
.expert-tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(22, 93, 255, 0.1);
}
.expert-tech-item:hover {
  transform: translateX(4px);
  background: #fff;
  box-shadow: 0 4px 12px rgba(22, 93, 255, 0.1);
  border-color: rgba(22, 93, 255, 0.2);
}
.expert-tech-item img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
.expert-tech-item span {
  font-size: 15px;
  color: #165DFF;
  font-weight: 500;
  min-width: 90px;
}
.expert-level {
  flex: 1;
  height: 8px;
  background: #e8f3ff;
  border-radius: 4px;
  overflow: hidden;
}
.expert-level-bar {
  height: 100%;
  background: linear-gradient(90deg, #165DFF, #4fc3f7);
  border-radius: 4px;
  transition: width 0.3s ease;
}
@media (max-width: 900px) {
  .expert-tech-item {
    padding: 8px 12px;
  }

  .expert-tech-item img {
    width: 20px;
    height: 20px;
  }

  .expert-tech-item span {
    min-width: 80px;
    font-size: 14px;
  }
}
</style>


