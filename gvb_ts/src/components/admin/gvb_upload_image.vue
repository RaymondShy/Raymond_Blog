<script setup lang="ts">
import {ref, watch} from "vue";

interface Props{
  modelValue:string
}
const props = defineProps<Props>()
const text = ref('')
const emits = defineEmits(['update:modelValue'])
watch(text, ()=>{
  emits('update:modelValue',text)
})
</script>

<template>
<div class="gvb_upload_image">
  <div class="line">
    <a-input placeholder="请输入图片链接" v-model="text"/>
    <a-button>上传</a-button>
  </div>
  <a-image-preview :src="props.modelValue"/>
</div>
</template>

<style scoped lang="scss">
.gvb_upload_image{
  width: 100%;
  .line{
    display: flex;
    .arco-btn{
      margin-left: 15px;
    }
  }
}
</style>
