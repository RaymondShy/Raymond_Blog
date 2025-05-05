<template>
  <div class="gvb_menu">
    <a-menu
        @menu-item-click="clickMenu"
        :default-open-keys="['0']"
        :default-selected-keys="['0_2']"
        v-model:selected-keys="selectedKeys"
        v-model:open-keys="openKeys"
    >
      <template v-for="(item, index) in menuList" :key="item.key">
        <a-menu-item :key="item.name" v-if="item.child?.length === 0">
          {{item.title}}
          <template #icon>
            <component :is="item.icon"></component>
          </template>
        </a-menu-item>
        <a-sub-menu :key="item.name" v-if="item.child?.length !== 0">
          <template #icon>
            <component :is="item.icon"></component>
          </template>
          <template #title>{{item.title}}</template>
          <a-menu-item :key="sub.name" v-for="sub in item.child">
            {{sub.title}}
            <template #icon>
              <component :is="sub.icon"></component>
            </template>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>

</template>
<script setup lang="ts">

import {type Component, ref, watch} from "vue";
import {type RouteMeta, useRoute, useRouter} from "vue-router";
import {IconHome, IconMenu, IconUser} from "@arco-design/web-vue/es/icon";
interface MenuType{
  key:string,
  title:string,
  icon?:Component,
  name?:string,
  child?:MenuType[]
}
interface MetaType extends RouteMeta{
  title:string
}
const route = useRoute();
const router = useRouter();
/* 默认选中的菜单项 */
const selectedKeys = ref([route.name])
/* 默认打开的菜单列 */
const openKeys = ref([route.matched[1].name])
// 菜单列表
const menuList:MenuType[] = [
  {key: "1", title: "Home", icon: IconHome, name: "home", child: []},
  {
    key: "2", title: "Personal center", icon: IconUser, name: "user_center", child: [
      {key: "2-1", title: "My information", icon: IconUser, name: "user_info"},
    ]
  },
  {
    key: "3", title: "Article management", icon: IconUser, name: "article", child: [
      {key: "3-1", title: "Article list", icon: IconUser, name: "article_list"},
    ]
  },
  {
    key: "4", title: "User management", icon: IconUser, name: "users", child: [
      {key: "4-1", title: "User list", icon: IconUser, name: "user_list"},
    ]
  },
  {
    key: "5", title: "Group chat management", icon: IconUser, name: "chat_group", child: [
      {key: "5-1", title: "Chat history", icon: IconUser, name: "chat_list"},
    ]
  },
  {
    key: "6", title: "System management\n", icon: IconUser, name: "system", child: [
      {key: "6-1", title: "Menu list", icon: IconUser, name: "menu_list"},
    ]
  }

]
// 菜单点击事件
const clickMenu = (name:string) =>{
  router.push({
    name:name
  })
}
/* 路由监听事件 */
watch(()=>route.name,()=>{
  selectedKeys.value=[route.name];
  openKeys.value=[route.matched[1].name];
})
</script>

<style lang="scss">
.gvb_menu {
  border-right:1px solid var(--color-border);
}
</style>

