<template>
  <div class="gvb_head_breadcrumbs">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="item in route.matched">{{(item.meta as MetaType).title}}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>

</template>

<script setup lang="ts">
import type {RouteMeta} from "vue-router";
import {useRoute} from "vue-router";

interface MetaType extends RouteMeta{
  title:string
}
const route = useRoute();
</script>

<style scoped>

</style>
