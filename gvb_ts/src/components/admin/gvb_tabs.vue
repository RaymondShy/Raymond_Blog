<template>
  <div class="gvb_tabs">
    <div :class="{gvb_tab:true, active:item.name === route.name}" v-for="item in tabList"
         @click="clickTab(item)"
         :key="item.name">
      {{item.title}}
      <IconClose v-if="item.name !== 'home'"/>
    </div>
    <div class="gvb_tab close_all_tab">全部关闭</div>
  </div>
</template>

<script setup lang="ts">
import {useRoute,useRouter} from "vue-router";
import {ref, type Ref, watch} from "vue";
import {IconClose} from "@arco-design/web-vue/es/icon";

const route = useRoute()
const router = useRouter()
interface tabType{
  name:string
  title:string
}
const  tabList:Ref<tabType[]> = ref([
  {name:'home',title:'首页'},
  {name:'user_info',title:'我的信息'}
])
/* tab点击事件 */
const clickTab = (item:tabType) => {
  router.push({
    name:item.name
  })
}
/* 判断路由是否在tabs中已经存在 @return: true:已存在 false: 未存在 */
const inList = (name:string)=>{
  for (const item of tabList.value){
    if (item.name === name){
      return true
    }
  }
  return false
}
/* 监听路由的变化 @options:immediate 页面刚打开时加载 */
watch(() => route.name,()=>{
  if (!inList(route.name as string)){
    tabList.value.push({name:route.name as string,title:route.meta.title as string})
  }
},{immediate:true})
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
