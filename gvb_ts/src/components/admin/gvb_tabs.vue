<template>
  <div class="gvb_tabs">
    <div class="gvb_tab active">首页</div>
    <div class="gvb_tab">用户列表</div>
    <div class="gvb_tab">文章列表</div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.gvb_tabs{
  width: 100%;
  height: 30px;
  border-bottom:1px solid var(--bg);
  align-items: center;
  padding: 0 20px;
  display: flex;
  .gvb_tab{
    border-radius: 5px;
    border: 1px solid var(--bg);
    padding: 2px 6px;
    margin-right: 10px;
    cursor: pointer;
    &.active{
      background-color: var(--active);
      color: #fff;
    }
  }
}

</style>
