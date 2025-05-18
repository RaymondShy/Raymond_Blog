<script setup lang="ts">

</script>

<template>
  <div class="system-config">
    <div class="system-config-left">
      <router-link :to="{name:'site_config'}">网站配置</router-link>
      <router-link :to="{name:'email_config'}">邮箱配置</router-link>
      <router-link :to="{name:'oss_config'}">OSS配置</router-link>
      <router-link :to="{name:'qq_config'}">QQ配置</router-link>
      <router-link :to="{name:'jwt_config'}">JWT配置</router-link>
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
