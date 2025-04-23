<template>
  <div class="gvb_admin">
    <aside>
      <div class="gvb_logo">
        <img src="../../../public/image/logo.jpg"  alt="图片加载失败"/>
        <div class="logo_head">
          <div>Raymond_Blog</div>
        </div>
      </div>
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
    </aside>
    <main>
      <div class="gvb_head">
<!--        面包屑区域-->
        <div class="gvb_head_breadcrumbs">
          <a-breadcrumb>
            <a-breadcrumb-item v-for="item in route.matched">{{(item.meta as MetaType).title}}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
<!--        右侧功能区-->
        <div class="gvb_function_area">
          <IconMenu class="gvb_action"/>
          <div class="gvb_theme">
            <IconSun class="gvb_action"/>
          </div>
          <div class="gvb_menu_dropdown">
            <a-dropdown :popup-max-height="false">
              <div class="gvb_menu_dropdown_text">
                <img src="../../../public/image/logo.jpg" alt="图片加载失败">
                <span>Raymond</span>
                <IconDown/>
              </div>
              <template #content>
                <a-doption>Option 1</a-doption>
                <a-doption disabled>Option 2</a-doption>
                <a-doption>Option 3</a-doption>
                <a-doption>Option 4</a-doption>
                <a-doption>Option 5</a-doption>
                <a-doption>Option 6</a-doption>
                <a-doption>Option 7</a-doption>
                <a-doption>Option 8</a-doption>
                <a-doption>Option 9</a-doption>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
      <div class="gvb_tabs">
        <div class="gvb_tab active">首页</div>
        <div class="gvb_tab">用户列表</div>
        <div class="gvb_tab">文章列表</div>
      </div>
      <div class="gvb_container">
        <router-view/>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  IconMenu,
  IconSun,
  IconApps,
  IconDown,
  IconBug,
  IconBulb, IconUser,
} from '@arco-design/web-vue/es/icon';
import {type RouteMeta, useRoute, useRouter} from "vue-router";
import {type Component, ref, watch} from "vue";
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
  {key: "1", title: "首页", icon: IconMenu, name: "home", child: []},
  {
    key: "2", title: "个人中心", icon: IconUser, name: "user_center", child: [
      {key: "2-1", title: "我的信息", icon: IconUser, name: "user_info"},
    ]
  },
  {
    key: "3", title: "文章管理", icon: IconUser, name: "article", child: [
      {key: "3-1", title: "文章列表", icon: IconUser, name: "article_list"},
    ]
  },
  {
    key: "4", title: "用户管理", icon: IconUser, name: "users", child: [
      {key: "4-1", title: "用户列表", icon: IconUser, name: "user_list"},
    ]
  },
  {
    key: "5", title: "群聊管理", icon: IconUser, name: "chat_group", child: [
      {key: "5-1", title: "聊天记录", icon: IconUser, name: "chat_list"},
    ]
  },
  {
    key: "6", title: "系统管理", icon: IconUser, name: "system", child: [
      {key: "6-1", title: "菜单列表", icon: IconUser, name: "menu_list"},
    ]
  },

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
.gvb_admin{
  width: 100%;
  height: 100%;
  display: flex;
  aside{
    width: 240px;
    height: 100vh;
    border-right: 1px solid var(--bg);
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
  }
  main{
    width: calc(100% - 240px);
    .gvb_head{
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--bg);
      align-items: center;
      padding: 0 20px;
      .gvb_function_area{
        display: flex;
        align-items: center;
        .gvb_action{
          margin-right: 10px;
        }
        .gvb_menu_dropdown{
          .gvb_menu_dropdown_text{
            display: flex;
            align-items: center;
            cursor: pointer;
            img{
              width: 40px;
              height: 40px;
              margin-right: 5px;
              border-radius: 50%;
            }
          }
        }
      }
    }
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
  }
}
</style>
