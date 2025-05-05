<template>
  <div class="gvb_logo">
    <div class="logo_svg">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- 左侧尖括号 -->
        <polyline points="18,32 8,24 18,16" stroke="#165DFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- 右侧尖括号 -->
        <polyline points="46,16 56,24 46,32" stroke="#165DFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- 对话气泡（C形） -->
        <path d="M40 20C36 16 24 16 24 32C24 48 36 48 40 44" stroke="#165DFF" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="32" cy="40" rx="6" ry="3" fill="#165DFF" opacity="0.15"/>
        <!-- 气泡小尾巴 -->
        <polygon points="32,46 30,44 34,44" fill="#165DFF" opacity="0.15"/>
      </svg>

    </div>
    <div class="logo_head">
      <div>Codecify</div>
      <div class="logo_sub">Blog</div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.gvb_logo{
  height: 60px;
  max-height: 90px;
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--bg);
  .logo_svg{
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo_head{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 16px;
    >div:nth-child(1){
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 2px;
      background: linear-gradient(90deg, #165DFF 0%, #4FC3F7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .logo_sub{
      font-size: 13px;
      color: #7a7e87;
      margin-top: 2px;
      letter-spacing: 1px;
    }
  }
}
</style>
