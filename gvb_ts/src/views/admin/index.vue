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
            :default-open-keys="['0']"
            :default-selected-keys="['0_2']"
        >
          <a-sub-menu key="0">
            <template #icon><icon-apps></icon-apps></template>
            <template #title>Navigation 1</template>
            <a-menu-item key="0_0">Menu 1</a-menu-item>
            <a-menu-item key="0_1">Menu 2</a-menu-item>
            <a-menu-item key="0_2">Menu 3</a-menu-item>
            <a-menu-item key="0_3">Menu 4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="1">
            <template #icon><icon-bug></icon-bug></template>
            <template #title>Navigation 2</template>
            <a-menu-item key="1_0">Menu 1</a-menu-item>
            <a-menu-item key="1_1">Menu 2</a-menu-item>
            <a-menu-item key="1_2">Menu 3</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="2">
            <template #icon><icon-bulb></icon-bulb></template>
            <template #title>Navigation 3</template>
            <a-menu-item key="2_0">Menu 1</a-menu-item>
            <a-menu-item key="2_1">Menu 2</a-menu-item>
            <a-sub-menu key="2_2" title="Navigation 4">
              <a-menu-item key="2_2_0">Menu 1</a-menu-item>
              <a-menu-item key="2_2_1">Menu 2</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
        </a-menu>
      </div>
    </aside>
    <main>
      <div class="gvb_head">
<!--        面包屑区域-->
        <div class="gvb_head_breadcrumbs">
          <a-breadcrumb>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>Channel</a-breadcrumb-item>
            <a-breadcrumb-item>News</a-breadcrumb-item>
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
  IconBulb,
} from '@arco-design/web-vue/es/icon';
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
