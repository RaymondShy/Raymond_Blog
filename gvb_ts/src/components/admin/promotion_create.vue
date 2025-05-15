<script setup lang="ts">
import {reactive, ref} from "vue";
import {
  createPromotionApi,
  type promotionType,
  updatePromotionApi
} from "@/api/carousel_api.ts";
import {Message} from "@arco-design/web-vue";
import type {baseResponse} from "@/api";
interface Props {
  visible: boolean
  record: promotionType
  title?:string
}
const props = defineProps<Props>()
const emits = defineEmits(['update:visible','ok'])
const formRef = ref()
const form = reactive<promotionType>({
  carouselId:undefined,
  imageUrl:"",
  carouselTitle:"",
  linkUrl:"",
  sortOrderNum:0,
  status:"",
  carouselTime:0
})
const okHandle = async () =>{
  let val = await formRef.value.validate();
  if(val) return;
  let res:baseResponse<string> = {}
  if (props.record.carouselId){
    res = await updatePromotionApi(form)
  }else{
    console.log(form)
    res = await createPromotionApi(form);
  }
  if (res.code !== 200){
    Message.error(res.msg)
  }
  Message.success(res.msg)
  emits('update:visible',false)
  emits('ok')
}
/* 菜单打开之前的操作 */
const beforeOpen = ()=>{
  Object.assign(form,props.record)
}
</script>

<template>
  <div>
    <a-modal :title="props.title||'创建推广'" :visible="props.visible" @cancel="emits('update:visible',false)" @beforeOpen="beforeOpen" :on-before-ok="okHandle">
      <a-form ref="formRef" :model="form" :label-col-props="{ span: 6 }"
              :wrapper-col-props="{ span: 18 }" class="user-form">
        <a-form-item field="carouselTitle" label="推广标题" :rules="[{required:true,message:'请输入推广标题'}]"
                     :validate-trigger="['blur']">
          <a-input placeholder="请输入推广标题" v-model="form.carouselTitle" allow-clear/>
        </a-form-item>
        <a-form-item field="linkUrl" label="跳转链接" :rules="[{required:true,message:'请输入跳转链接'}]"
                     :validate-trigger="['blur']">
          <a-input placeholder="请输入跳转链接" v-model="form.linkUrl" allow-clear/>
        </a-form-item>
        <a-form-item field="imageUrl" label="图片路径" :rules="[{required:true,message:'请输入图片访问路径'}]"
                     :validate-trigger="['blur']">
          <a-input placeholder="请输入图片访问路径" v-model="form.imageUrl" allow-clear/>
        </a-form-item>
        <a-form-item field="sortOrderNum" label="排序编号">
          <a-input-number placeholder="请输入排序编号" v-model="form.sortOrderNum" allow-clear/>
        </a-form-item>
        <a-form-item field="carouselTime" label="carouselTime">
          <a-input placeholder="请输入推广切换时间" v-model="form.carouselTime" allow-clear/>
          <template #extra>
            <div>推广切换时间</div>
          </template>
        </a-form-item>
        <a-form-item field="status" label="状态">
          <a-switch v-model="form.status" active-color="green" checked-value="0" unchecked-value="1"></a-switch>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss">
.banner_image_url{
  display: flex;
  align-items: center;
  padding: 5px 0;
  img{
    margin-right: 5px;
    border-radius: 5%;
  }
}
</style>
