<script setup lang="ts">

</script>

<template>
  <div class="system-config">
    <div class="system-config-left">
      <router-link :to="{name:'site_config'}">网站配置</router-link>
      <a>邮箱设置</a>
      <a>七牛云设置</a>
      <a>QQ设置</a>
      <a>JWT设置</a>
    </div>
    <div class="system-config-right">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
.system-config {
  display: flex;

  .system-config-left {
    width: 160px;
    height: calc(100vh - 140px);
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-2);
    border-radius: 5px;
    padding: 20px;

    a {
      color: var(--color-text-2);
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      border-radius: 5px;
      background-color: var(--color-fill-2);
      height: 50px;
      margin-bottom: 10px;

      &.router-link-exact-active {
        background-color: var(--active);
        color: white;
      }
    }
  }
  .system-config-right {
    width: calc(100% - 180px);
    min-height: calc(100vh - 140px);
    padding: 20px;
    border-radius: 5px;
    margin-left: 20px;
    background-color: var(--color-bg-2);
  }
}
</style>
