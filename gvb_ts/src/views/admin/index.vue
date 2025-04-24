<template>
  <div class="gvb_admin">
    <aside>
      <Gvb_logo/>
      <Gvb_menu/>
    </aside>
    <main>
      <div class="gvb_head">
<!--        面包屑区域-->
        <Gvb_bread_crumb/>
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
      <Gvb_tabs/>
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
  IconDown,
} from '@arco-design/web-vue/es/icon';
import Gvb_menu from "@/components/admin/gvb_menu.vue";
import Gvb_logo from "@/components/admin/gvb_logo.vue";
import Gvb_bread_crumb from "@/components/admin/gvb_bread_crumb.vue";
import Gvb_tabs from "@/components/admin/gvb_tabs.vue";

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
    .gvb_container{
      width: 100%;
      min-height: calc(100vh - 90px);
      padding: 20px;
    }
  }
}
</style>
