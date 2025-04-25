<template>
  <div class="gvb_tabs">
    <div :class="{gvb_tab:true, active:item.name === route.name}" v-for="item in tabList" :key="item.name">
      {{item.title}}
      <IconClose v-if="item.name !== 'home'"/>
    </div>
    <div class="gvb_tab close_all_tab">全部关闭</div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref, type Ref} from "vue";
import {IconClose} from "@arco-design/web-vue/es/icon";

const route = useRoute()
interface tabType{
  name:string
  title:string
}
const  tabList:Ref<tabType[]> = ref([
  {name:'home',title:'首页'},
  {name:'user_info',title:'我的信息'}
])
</script>

<style lang="scss" scoped>
.gvb_tabs{
  width: 100%;
  height: 30px;
  border-bottom:1px solid var(--bg);
  align-items: center;
  padding: 0 20px;
  display: flex;
  position: relative;
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
  .close_all_tab{
    position: absolute;
    right: 20px;
    border: 1px solid var(--bg);
    padding: 2px 6px;
    border-radius: 5px;
    cursor: pointer;
  }
  svg{
    font-size: 12px;
    border-radius: 50%;
    cursor: pointer;
    &:hover{
      background-color: var(--bg);
    }
  }
}

</style>
