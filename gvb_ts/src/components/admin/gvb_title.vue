<script setup lang="ts">
const props = defineProps({
  title: {type:String}
})
</script>

<template>
<div class="gvb_title">
  {{props.title}}
</div>
</template>

<style lang="scss">
.gvb_title{
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  &::before{
    width: 3px;
    height: 1.2rem;
    content: "";
    display: inline-block;
    opacity: 0.7;
    background-color: var(--active);
    margin-right: 8px;
  }
}
</style>
