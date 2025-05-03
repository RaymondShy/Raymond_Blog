import type {baseResponse, listDataType, paramsType} from "@/api/index";
import {useAxios} from "@/api/index";

export interface loginEmailType {
    username: string
    password: string
}

export interface userInfoType {
    userId:number
    nickName:string
    userName:string
    password:string
    tel:string
    email:string
    loginIp:string
    registerTime:string
    avatar:string
    bio:string
    website:string
    status:string
    lastLoginTime:string
    lastLoginIp:string
    createTime:string
    updateTime:string

}

export function loginPwdApi(request: loginEmailType): Promise<baseResponse<string>> {
    return useAxios.post("/api/login/pwd", request,
        {
            headers:{
                "Content-Type": "application/json",
            }
        })
}

export function getUserList(params:paramsType):Promise<baseResponse<listDataType<userInfoType>>> {
    return useAxios.get("/api/system/search", {params:params,headers:{
        "Content-Type": "application/json",
        }})
}

export function defaultDeleteApi(idList:number[]):Promise<baseResponse<string>> {
    return useAxios.delete(`/api/system/${idList}`)
}
