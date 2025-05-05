<template>
  <div class="gvb_tabs">
    <div class="tabs-scroll">
      <div
          v-for="item in tabList"
          :key="item.name"
          :class="['gvb_tab', { active: item.name === route.name }]"
          @click="clickTab(item)"
      >
        <span class="tab-title">{{ item.title }}</span>
        <IconClose
            v-if="item.name !== 'home'"
            class="tab-close"
            @click.stop="closeClick(item)"
        />
      </div>
    </div>
    <a-button class="close_all_tab" size="mini" @click="closeAllTabClick" type="outline">
      全部关闭
    </a-button>
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
    console.log(tabList.value)
  }
},{immediate:true})
/* 关闭一个tab */
const closeClick = (item:tabType)=>{
  console.log(tabList.value)
  // 如果为home不关
  if (item.name === 'home'){
    return
  }
  // 找到tab在当前列表中的索引
  let index = tabList.value.findIndex((tab)=> item.name === tab.name )
  console.log(index)
  tabList.value.splice(index,1)
  // 判断当前删除的tab和当前页面的路由是否一致
  if (route.name === item.name){
    let beforeIndex = index - 1;
    let beforeItem = tabList.value[beforeIndex];
    clickTab(beforeItem);
  }
}
/* 关闭所有tabs */
const closeAllTabClick = () =>{
  tabList.value = [
    {name:'home',title:'首页'}
  ]
  router.push({name:'home'})
}
/* tabs持久化 */
const tabsPersistence = () =>{
  localStorage.setItem('tabList', JSON.stringify(tabList.value))
}
/* 监听tabs的变化 */
watch(()=>tabList.value.length,()=>{
  tabsPersistence()
})
/* 页面刚打开时加载 */
const loadTabs = () =>{
  let val = localStorage.getItem('tabList')
  if (val === null){
    return
  }
  let tabs = []
  try {
    tabs = JSON.parse(val)
  }catch(err){
    return;
  }
  tabList.value = tabs;
}
loadTabs()
</script>

<style lang="scss" scoped>
.gvb_tabs {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-1);
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 12px;

  .tabs-scroll {
    display: flex;
    align-items: center;
    overflow-x: auto;
    flex: 1;
    &::-webkit-scrollbar {
      height: 4px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--color-bg-1);
      border-radius: 2px;
    }
  }

  .gvb_tab {
    display: flex;
    align-items: center;
    background: transparent;
    border-radius: 6px 6px 0 0;
    margin-right: 8px;
    padding: 0 16px;
    height: 32px;
    font-size: 15px;
    color: var(--color-text-2);
    cursor: pointer;
    position: relative;
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: var(--color-fill-2);
    }

    &.active {
      background: var(--color-bg-1);
      color: rgb(var(--primary-6));
      font-weight: 600;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.03);
      border-bottom: 2px solid rgb(var(--primary-6));
      z-index: 1;
    }

    .tab-title {
      margin-right: 4px;
      white-space: nowrap;
    }

    .tab-close {
      font-size: 13px;
      color: #bbb;
      margin-left: 2px;
      opacity: 0;
      transition: opacity 0.2s;
      border-radius: 50%;
      &:hover {
        background: #f2f3f5;
        color: #f53f3f;
      }
    }

    &:hover .tab-close {
      opacity: 1;
    }
  }

  .close_all_tab {
    margin-left: 12px;
    height: 28px;
    font-size: 13px;
    border-radius: 4px;
    border: 1px solid var(--color-border);
    background: var(--color-bg-2);
    color: var(--color-text-2);
    transition: background 0.2s, color 0.2s;
    &:hover {
      background: rgb(var(--primary-1));
      color: rgb(var(--primary-6));
      border-color: rgb(var(--primary-6));
    }
  }
}
</style>

