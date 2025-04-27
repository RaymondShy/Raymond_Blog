import { defineStore } from 'pinia'
import {parseToken} from "@/utils/jwt.ts";
import {Message} from "@arco-design/web-vue";

export interface UserInfoType{
  nickName:string
  role:number
  userId:number
  avatar:string
  token:string
  exp:number
}

/* 主题切换 */
const theme = true
const userInfo:UserInfoType = {
  nickName:"",
  role:0,
  userId:0,
  avatar:"",
  token:"",
  exp:0
}
export const useCounterStore = defineStore('counter', {
  state(){
    return{
      theme: theme,
      userInfo:userInfo,
    }
  },
  actions: {
    /* 主题切换 */
    setTheme(loadTheme?:boolean){
      if (loadTheme !== undefined){
        this.theme = loadTheme
      }else{
        this.theme = !this.theme
      }
      document.documentElement.style.colorScheme = this.themeString
      document.body.setAttribute('arco-theme',this.themeString)
      localStorage.setItem('theme', JSON.stringify(this.theme))
    },
    // 设置token
    setToken(token: string) {
      this.userInfo.token = token
      let info = parseToken(token)
      Object.assign(this.userInfo, info)
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
    },
    // 加载token
    loadToken() {
      let val = localStorage.getItem("userInfo")
      if (val === null) {
        return
      }
      try {
        this.userInfo = JSON.parse(val)
      } catch (e) {
        this.clearUserInfo()
        return;
      }
      // 判断token是不是过期了
      let exp = Number(this.userInfo.exp) * 1000
      let nowTime = new Date().getTime()
      if (exp - nowTime <= 0) {
        // 过期
        Message.warning("登录已过期")
        this.clearUserInfo()
        return;
      }
    },
    // 注销
    // async logout() {
    //   await logoutApi()
    //   this.clearUserInfo()
    // },
    // 清空用户信息
    clearUserInfo() {
      this.userInfo = userInfo
      localStorage.removeItem("userInfo")
    },
    /* 初始化theme */
    loadTheme(){
      let val = localStorage.getItem('theme')
      if (val === null){
        return
      }
        try{
          this.theme = JSON.parse(val)
          this.setTheme(this.theme)
        }catch (e){
          return;
        }

    }
  },
  getters:{
    themeString():string{
      return this.theme ? 'light' : 'dark';
    }
  }
})
