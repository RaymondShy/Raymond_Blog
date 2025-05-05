<template>
  <div>
    <gvb_bread_crumb/>
    <div class="user-list-container">
      <a-modal title="创建用户" v-model:visible="visible" :on-before-ok="createUser" :on-before-cancel="cancelUser" class="user-form-modal">
        <a-form ref="formRef" :model="form" :label-col-props="{ span: 6 }"
                :wrapper-col-props="{ span: 18 }" class="user-form">
          <a-form-item field="userName" label="用户名" :rules="[{required:true,message:'请输入用户名'}]"
                       :validate-trigger="['blur']">
            <a-input v-model="form.userName" placeholder="请输入用户名" allow-clear>
              <template #prefix>
                <icon-user class="input-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="nickName" label="昵称" :rules="[{required:true,message:'请输入昵称'}]"
                       :validate-trigger="['blur']">
            <a-input v-model="form.nickName" placeholder="请输入用户昵称" allow-clear>
              <template #prefix>
                <icon-user class="input-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="realName" label="真实姓名" :rules="[{required:true,message:'请输入真实姓名'}]"
                       :validate-trigger="['blur']">
            <a-input v-model="form.realName" placeholder="请输入真实姓名" allow-clear>
              <template #prefix>
                <icon-user-group class="input-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="password" label="密码" :rules="[{required:true,message:'请输入密码'}]"
                       :validate-trigger="['blur']">
            <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear>
              <template #prefix>
                <icon-lock class="input-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item field="re_password" label="确认密码" :rules="[{required:true,message:'请确认密码'},{validator:rePasswordValidator}]"
                       :validate-trigger="['blur']">
            <a-input-password v-model="form.re_password" placeholder="请确认密码" allow-clear>
              <template #prefix>
                <icon-lock class="input-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item field="gender" label="性别" :rules="[{required:true,message:'请选择性别'}]"
                       :validate-trigger="['blur']">
            <a-radio-group v-model="form.gender" type="button">
              <a-radio v-for="item in genderStrings" :value="item.value">
                  {{ item.label }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item field="tel" label="手机号" :rules="[{required:true,message:'请输入手机号'}]"
                       :validate-trigger="['blur']">
            <a-input placeholder="请输入手机号" v-model="form.tel" max-length="11" allow-clear>
              <template #prefix>
                <icon-phone class="input-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="email" label="邮箱">
            <a-input placeholder="请输入邮箱" v-model="form.email" type="email" allow-clear>
              <template #prefix>
                <icon-email class="input-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="status" label="状态" :rules="[{required:true,message:'请选择状态'}]"
                       :validate-trigger="['blur']">
            <a-select placeholder="请选择状态" disabled :options="statusOptions" v-model="form.status">
              <template #prefix>
                <icon-check-circle class="input-icon" />
              </template>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
      <div class="table-wrapper">
        <gvb_table :url="getUserList" :columns="columns"
                   :page-size="8" add-label="创建用户"
                   default-delete
                   @add="visible = true" @remove="remove" @edit="edit"
                   :action-group-options="actionGroupOptions"
        ref="gvbTable">
          <template #avatar="{record}">
            <a-avatar :image-url="record.avatar" class="user-avatar" />
          </template>
        </gvb_table>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import Gvb_table from "@/components/admin/gvb_table.vue";
import {getUserList, userCreateApi, type userCreateType, type userInfoType} from "@/api/user_api.ts";
import type {optionType} from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
import {
  IconUser,
  IconUserGroup,
  IconLock,
  IconMan,
  IconWoman,
  IconPhone,
  IconEmail,
  IconCheckCircle
} from '@arco-design/web-vue/es/icon';
import Gvb_bread_crumb from "@/components/admin/gvb_bread_crumb.vue";
import {Message} from "@arco-design/web-vue";
const visible = ref(false)
const columns = [
  {
    title: '昵称',
    dataIndex: 'nickName',
  },
  {
    title: '头像',
    slotName: 'avatar',
  },
  {
    title: '登录IP',
    dataIndex: 'loginIp',
  },
  {
    title: '注册时间',
    slotName: 'registerTime',
  },

  {
    title: '电话号',
    dataIndex: 'tel',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  // {
  //   title: '个人博客地址',
  //   dataIndex: 'website',
  // },
  {
    title: '状态',
    slotName: 'status',
  },
  {
    title: '简介',
    dataIndex: 'bio',
  },
  {
    title:'操作',
    slotName:'action'
  }
]
/* 操作组 */
const actionGroupOptions:optionType[] = [
  {label:'批量拉黑',callback: async (idList:(number|string)[]):Promise<boolean> =>{
      return true;
    }}
]

const formRef = ref()
/* form表单 */
const form = reactive<userCreateType&{re_password:string}&{avatar:string}>({
  userName:"",
  nickName:"",
  password:"",
  realName:"",
  gender:"1",
  tel:"",
  email:"",
  status:"0",
  re_password:"",
  avatar:"https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
})
const defaultForm = {
  userName:"",
  nickName:"",
  password:"",
  realName:"",
  gender:"1",
  tel:"",
  email:"",
  status:"0",
  re_password:"",
  avatar:"https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
}
// 性别组
const genderStrings = reactive([
      {
        label:'男',
        value:'0',
      },
      {
        label:'女生',
        value:'1',
      },
      {
        label: '不愿透露',
        value:'2',
      }
    ]
)
// 状态组
const statusOptions = [
  {
    label:'正常',
    value:'0',
  },
  {
    label:'停用',
    value:'1',
  },
  {
    label:'异常',
    value:'2',
  }
]
const gvbTable = ref()
/* createUser 表单校验*/
const  createUser = async () => {
  let val = await formRef.value.validate()
  console.log(val)
  if (val) {
    return false
  }
  let res = await userCreateApi(form)
  console.log(res)
  if (res.code !== 200){
    if (res.code === 602){
      Message.warning(res.msg)
      return
    }
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  visible.value = false
  gvbTable.value.getList()
  Object.assign(form,defaultForm)
  return true
}
/* cancelUser 取消表单 */
const cancelUser = () =>{
  Object.assign(form,defaultForm)
  visible.value = false
  return true
}
//  密码校验
const rePasswordValidator = (value:string,callback:(error?:string) =>void):void=>{
  if(value !== form.password) return callback("确认密码不一致")
}
/* 新增 */
const add = (record:userInfoType) =>{
  console.log('add',record)
}
/* 修改 */
const edit = (record:userInfoType) =>{
  console.log(record)
}
/* 删除 */
const remove = (idList: number[]) =>{
  console.log(idList)
}

// 添加状态颜色和文本映射
const getStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    '1': 'green',
    '2': 'red',
    '3': 'orange'
  };
  return statusMap[status] || 'gray';
};

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    '1': '正常',
    '2': '停用',
    '3': '异常'
  };
  return statusMap[status] || '未知';
};
</script>

<style scoped>
.user-list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px 20px;
  background-color: var(--color-bg-2);
  position: relative;
}

.table-wrapper {
  background-color: var(--color-bg-1);
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.user-form-modal {
  :deep(.arco-modal-content) {
    padding: 24px;
  }

  :deep(.arco-modal-header) {
    border-bottom: 1px solid var(--color-border);
    padding: 16px 24px;
    margin-bottom: 0;
  }

  :deep(.arco-modal-footer) {
    border-top: 1px solid var(--color-border);
    padding: 16px 24px;
    margin-top: 0;
  }
}

.user-form {
  :deep(.arco-form-item) {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(.arco-input-wrapper) {
    border-radius: 4px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border-width: 1px;
    height: 36px;

    &:hover {
      border-color: rgb(var(--primary-6));
      background-color: var(--color-fill-2);
    }

    &:focus-within {
      border-color: rgb(var(--primary-6));
      box-shadow: 0 0 0 2px rgba(var(--primary-6), 0.1);
      background-color: var(--color-bg-1);
    }
  }

  :deep(.arco-input-password) {
    border-radius: 4px;
    height: 36px;
  }

  :deep(.arco-select-view) {
    border-radius: 4px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    height: 36px;

    &:hover {
      border-color: rgb(var(--primary-6));
      background-color: var(--color-fill-2);
    }

    &:focus-within {
      border-color: rgb(var(--primary-6));
      box-shadow: 0 0 0 2px rgba(var(--primary-6), 0.1);
      background-color: var(--color-bg-1);
    }
  }

  .input-icon {
    color: var(--color-text-3);
    font-size: 16px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  :deep(.arco-input-wrapper:hover) .input-icon,
  :deep(.arco-input-wrapper:focus-within) .input-icon,
  :deep(.arco-select-view:hover) .input-icon,
  :deep(.arco-select-view:focus-within) .input-icon {
    color: rgb(var(--primary-6));
  }
}

.gender-radio {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 4px 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  height: 32px;

  .gender-icon {
    font-size: 16px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.checked {
    color: rgb(var(--primary-6));
    background-color: rgba(var(--primary-6), 0.1);

    .gender-icon {
      color: rgb(var(--primary-6));
    }
  }
}

:deep(.arco-radio-group-button) {
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--color-fill-2);
  border: 1px solid var(--color-border);

  .arco-radio-button {
    margin: 0;
    border-radius: 0;
    border: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    height: 32px;

    &:hover {
      background-color: var(--color-fill-3);
    }

    &:not(:last-child) {
      border-right: 1px solid var(--color-border);
    }
  }
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
}

:deep(.arco-table) {
  .arco-table-th {
    background-color: var(--color-fill-2);
    font-weight: 500;
    color: var(--color-text-1);
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
  }

  .arco-table-td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
  }

  .arco-table-tr:hover {
    .arco-table-td {
      background-color: var(--color-fill-2);
    }
  }
}

:deep(.arco-pagination) {
  margin: 16px 0;
  padding: 0 16px;

  .arco-pagination-item {
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;

    &:hover {
      background-color: var(--color-fill-2);
    }

    &.arco-pagination-item-active {
      background-color: rgb(var(--primary-6));
      color: var(--color-white);

      &:hover {
        background-color: rgb(var(--primary-5));
      }
    }
  }
}
</style>
