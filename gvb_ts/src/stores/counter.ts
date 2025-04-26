import { defineStore } from 'pinia'

/* 主题切换 */
const theme = true
export const useCounterStore = defineStore('counter', {
  state(){
    return{
      theme: theme,
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
