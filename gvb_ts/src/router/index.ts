import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'web',
      component: () => import('../views/web/web.vue'),
      children: [
        {
          path: "",
          name: "index",
          component: () => import('../views/web/index.vue'),
        }
      ]
    },
    {
      path: "/admin",
      name: "admin",
      meta:{
        title:'Home'
      },
      component: () => import('../views/admin/index.vue'),
      children: [
        {
          path: "",
          name: "home",
          meta:{
            title:'Home'
          },
          component: () => import('../views/admin/home/index.vue'),
        },
        {
          path: "user_center",
          name: "user_center",
          meta:{
            title:'Personal center'
          },
          children: [
            {
              path: "user_info",
              name: "user_info",
              meta:{
                title:'My information'
              },
              component: () => import('../views/admin/user_center/user_info.vue'),
            }
          ]
        },
        {
          path: "article",
          name: "article",
          meta:{
            title:'Article management'
          },
          children: [
            {
              path: "article_list",
              name: "article_list",
              meta:{
                title:'Article list'
              },
              component: () => import('../views/admin/article/article_list.vue'),
            }
          ]
        },
        {
          path: "users",
          name: "users",
          meta:{
            title:'User management'
          },
          children: [
            {
              path: "user_list",
              name: "user_list",
              meta:{
                title:'User list'
              },
              component: () => import('../views/admin/users/user_list.vue'),
            }
          ]
        },
        {
          path: "user_center",
          name: "user_center",
          meta: {
            title: 'User center'
          },
          children: [
            {
              path: "user_info",
              name: "user_info",
              meta: {
                title:'User info'
              },
              component: () => import('../views/admin/user_center/user_info.vue'),
            }
          ]
        },
        {
          path: "chat_group",
          name: "chat_group",
          meta:{
            title:'Chat group management'
          },
          children: [
            {
              path: "chat_list",
              name: "chat_list",
              meta:{
                title:'Chat history'
              },
              component: () => import('../views/admin/chat_group/chat_list.vue'),
            }
          ]
        },
        {
          path: "system",
          name: "system",
          meta: {
            title: 'System'
          },
          children: [
            {
              path: "menu_list",
              name: "menu_list",
              meta: {
                title:'Menu list'
              },
              component: () => import('../views/admin/system/menu_list.vue'),
            },
            {
              path: "promotion_list",
              name: "promotion_list",
              meta: {
                title:'Promotion list'
              },
              component: () => import('../views/admin/system/promotion_list.vue'),
            },
          ]
        },
        {
          path: "settings",
          name:"settings",
          meta:{
            title:'Account settings'
          },
          component:()=>import('../views/admin/settings/AccountSettings.vue')
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:()=> import('../views/login/index.vue')
    }
  ]
})

export default router
