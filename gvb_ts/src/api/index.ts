import axios from "axios";
import {useCounterStore} from "@/stores/counter.ts";
import {Message} from "@arco-design/web-vue";

export const useAxios = axios.create({
    baseURL: ""
})

export interface baseResponse<T> {
    code: number
    data: T
    msg: string
}

useAxios.interceptors.request.use((config) => {
    const store = useCounterStore()
    config.headers["token"] = store.userInfo.token
    return config
})

useAxios.interceptors.response.use((response) => {
    if (response.status !== 200) {
        // 失败的
        console.log("服务失败", response.status)
        Message.error(response.statusText)
        return Promise.reject(response.statusText)
    }
    return response.data
}, (err) => {
    console.log("服务错误", err)
    Message.error(err.message)
    return Promise.reject(err.message)
})
