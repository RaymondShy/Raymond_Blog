<template>
  <div class="gvb_logo">
<!--    <img src="../../../public/image/logo.jpg"  alt="图片加载失败"/>-->
    <div class="logo_head">
      <div>Codecify_Blog</div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.gvb_logo{
  height: 90px;
  padding: 20px;
  display: flex;
  border-bottom: 1px solid var(--bg);
  img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .logo_head{
    display: flex;
    align-items: center;
    margin-left: 10px;
    >div:nth-child(1){
      font-size: 20px;
    }
    //>div:nth-child(2){
    //  font-size: 12px;
    //}
  }
}

</style>
