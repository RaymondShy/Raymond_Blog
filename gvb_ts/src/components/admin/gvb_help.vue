<script setup lang="ts">
import Gvb_title from "@/components/admin/gvb_title.vue";

interface Props {
  title?: string,
  data:helpType[]
}
interface helpType{
  title:string,
  abs:string,
  content?:string
}
const props = defineProps<Props>();
const { title="帮助" } = props
</script>

<template>
<div class="gvb_help">
  <gvb_title :title="props.title"/>
  <div class="col" v-for="item in props.data">
    <div class="title">
      <div class="column">{{item.title}}</div>
      <div class="abs">{{item.abs}}</div>
    </div>
    <div class="content" v-if="item.content" v-html="item.content"></div>
  </div>
</div>
</template>

<style lang="scss">
.gvb_help{
  .col{
    margin-top: 20px;
    .title{
     display: flex;
      .column{
        font-weight: 700;
        &:after{
          content: '：';
        }
      }
    }
  }
  .content{
    margin-top: 10px;
    a{
      color: var(--active);
    }
    img{
      width: 80%;
      height: 100%;
    }
  }
}
</style>
