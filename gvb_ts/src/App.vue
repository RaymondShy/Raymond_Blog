<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {useCounterStore} from "@/stores/counter.ts";
const store = useCounterStore();
store.loadTheme()
store.loadToken()
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
