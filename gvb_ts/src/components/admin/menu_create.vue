<script setup lang="ts">
import {reactive, ref} from "vue";
import {createMenuApi, type menuCreateRequest} from "@/api/menu_api.ts";
import {type carouselImageType, getCarouselImageNameList} from "@/api/carousel_api.ts";
import {Message} from "@arco-design/web-vue";

const props = defineProps({
  visible:{
    type:Boolean
  }
})
const emits = defineEmits(['update:visible','ok'])
const formRef = ref()
const form = reactive<menuCreateRequest>({
  menuName:'',
  slogan:'',
  menuAbstract:'',
  menuOrderNum:0,
  abstractT:7,
  status:'',
  menuUrl:'',
  idList:[],
})
// 轮播图名称列表初始化
const carouselNames = ref<carouselImageType[]>([])
// 获取轮播图列表
const getCarouselList = async () => {
  let res = await getCarouselImageNameList()
  carouselNames.value = res.data;
}
getCarouselList()
const okHandle = async () =>{
  let val = await formRef.value.validate();
  if(val) return;
  console.log(form)
  let res = await createMenuApi(form)
  if (res.code !== 200){
    Message.error(res.msg)
  }
  Message.success('新增菜单数据成功')
  emits('update:visible',false)
  emits('ok')
}
</script>

<template>
  <div>
    <a-modal title="创建菜单" :visible="props.visible" @cancel="emits('update:visible',false)" :on-before-ok="okHandle">
      <a-form ref="formRef" :model="form" :label-col-props="{ span: 6 }"
              :wrapper-col-props="{ span: 18 }" class="user-form">
        <a-form-item field="menuName" label="菜单标题" :rules="[{required:true,message:'请输入菜单标题'}]"
                     :validate-trigger="['blur']">
          <a-input placeholder="请输入菜单标题" v-model="form.menuName" allow-clear/>
        </a-form-item>
        <a-form-item field="menuUrl" label="菜单路径" :rules="[{required:true,message:'请输入菜单路径'}]"
              :validate-trigger="['blur']">
          <a-input placeholder="请输入菜单路径" v-model="form.menuUrl" allow-clear/>
        </a-form-item>
        <a-form-item field="slogan" label="slogan">
          <a-input placeholder="请输入slogan" v-model="form.slogan" allow-clear/>
        </a-form-item>
        <a-form-item field="menuAbstract" label="简介">
          <a-textarea placeholder="请输入菜单简介" v-model="form.menuAbstract" allow-clear/>
        </a-form-item>
        <a-form-item field="abstractT" label="abstractT">
          <a-input placeholder="请输入简介切换时间" v-model="form.abstractT" allow-clear/>
          <template #extra>
            <div>abstract切换时间</div>
          </template>
        </a-form-item>
        <a-form-item field="status" label="状态">
          <a-switch v-model="form.status" active-color="green" checked-value="0" unchecked-value="1"></a-switch>
        </a-form-item>
        <a-form-item field="idList" label="idList">
          <a-select v-model="form.idList" multiple placeholder="请选择轮播图">
            <a-option v-for="item in carouselNames" :key="item.carouselId" :value="item.carouselId">
              <div class="banner_image_url">
                <img :src="item.imageUrl" width="70" height="40" alt="图片加载失败"/>{{item.carouselTitle}}
              </div>
            </a-option>
          </a-select>
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
