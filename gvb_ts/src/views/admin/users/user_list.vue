<template>
  <div>
    <gvb_bread_crumb/>
    <div class="user-list-container">
      <user_create v-model:visible="visible" @ok="createOk" v-model:role-list="roleList"></user_create>
      <a-modal title="修改用户" v-model:visible="updateVisible" :on-before-ok="updateOk">
        <a-form ref="formRef" :model="updateForm" :label-col-props="{ span: 6 }"
                :wrapper-col-props="{ span: 18 }" class="user-form">
          <a-form-item field="status" label="状态" :rules="[{required:true,message:'请选择状态'}]"
                       :validate-trigger="['blur']">
            <a-select placeholder="请选择状态" :options="statusOptions" v-model="updateForm.status">
              <template #prefix>
                <icon-check-circle class="input-icon" />
              </template>
            </a-select>
          </a-form-item>
          <a-form-item field="roleId" label="角色" :rules="[{required:true,message:'请选择角色'}]"
                       :validate-trigger="['blur']">
            <a-select placeholder="请选择角色" :options="roleList" :field-names="fieldNames" v-model="updateForm.roleId">
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
                   @add="openModal" @remove="remove" @edit="edit"
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
import {getUserList, userCreateApi, type userInfoType, userUpdateApi, type userUpdateType} from "@/api/user_api.ts";
import type {optionType} from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
import Gvb_bread_crumb from "@/components/admin/gvb_bread_crumb.vue";
import {getRoleList, type roleType} from "@/api/role_api.ts";
import User_create from "@/components/admin/user_create.vue";
import {IconCheckCircle} from "@arco-design/web-vue/es/icon";
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
const fieldNames = {value:'roleId',label:'roleName'}
/* 操作组 */
const actionGroupOptions:optionType[] = [
  {label:'批量拉黑',callback: async (idList:(number|string)[]):Promise<boolean> =>{
      return true;
    }}
]
const gvbTable = ref()

const roleList= reactive<roleType[]>([])
/* 打开弹窗 */
const openModal = async () => {
  const res = await getRoleList()
  let roleList2 = res.data
  Object.assign(roleList, roleList2)
  visible.value = true
  console.log(roleList)
}
// 修改用户
const updateVisible = ref(false)
const updateForm = reactive<userUpdateType>({
  userId:0,
  roleId:0,
  status:''
})
/* 修改 */
const formRef = ref()
const edit = async (record:userInfoType& { roleId: number }) =>{
  const res = await getRoleList()
  let roleList2 = res.data
  Object.assign(roleList, roleList2)
  updateForm.userId = record.userId
  updateForm.roleId = record.roleId
  updateForm.status = record.status
  updateVisible.value = true
  console.log(record)
}
const updateOk = async () =>{
  let val = await formRef.value.validate()
  console.log(val)
  if (val) {
    return false
  }
  let res = await userUpdateApi(updateForm)
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
  gvbTable.value.getList()
  return true
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
const createOk = () => {
  gvbTable.value.getList()
}

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
