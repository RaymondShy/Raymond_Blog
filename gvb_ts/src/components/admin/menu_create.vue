<script setup lang="ts">
import {reactive, ref} from "vue";
import type {menuCreateRequest} from "@/api/menu_api.ts";

const props = defineProps({
  visible:{
    type:Boolean
  }
})
const emits = defineEmits(['update:visible'])
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
</script>

<template>
  <div>
    <a-modal title="创建菜单" :visible="props.visible" @cancel="emits('update:visible',false)">
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
        <a-form-item field="slogan" label="slogan" :rules="[{required:true,message:'请输入slogan'}]"
        :validate-trigger="['blur']">
          <a-input placeholder="请输入slogan" v-model="form.slogan" allow-clear/>
        </a-form-item>
        <a-form-item field="menuAbstract" label="简介" :rules="[{required:true,message:'请输入菜单简介'}]"
                     :validate-trigger="['blur']">
          <a-textarea placeholder="请输入菜单简介" v-model="form.menuAbstract" allow-clear/>
        </a-form-item>
        <a-form-item field="abstractT" label="abstractT" :rules="[{required:true,message:'请输入简介切换时间'}]"
                     :validate-trigger="['blur']">
          <a-input placeholder="请输入简介切换时间" v-model="form.abstractT" allow-clear/>
        </a-form-item>
        <a-form-item field="idList" label="idList">
          <a-select v-model="form.idList" placeholder="请选择轮播图" />
        </a-form-item>

      </a-form>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">

</style>
