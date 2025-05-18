import {type baseResponse, useAxios} from "@/api/index.ts";

export interface settingsType{
    addr: string,
    beiAn: string,
    bilibiliUrl: string,
    createdAt: string,
    email: string,
    giteeUrl: string,
    githubUrl: string,
    job: string,
    name: string,
    qqImage: string,
    slogan: string,
    sloganEn: string,
    title: string,
    version: string,
    web: string,
    wechatImage:string,
}

export function getSetting():Promise<baseResponse<settingsType>> {
    return useAxios.get('/api/system/settings')
}

export function updateSetting(data:settingsType):Promise<baseResponse<string>> {
    return useAxios.put('/api/system/settings', data)
}

export interface emailType{
    host:string,
    port:number,
    username:string,
    protocol:string,
    password:string,
    auth:boolean,
    useTls:boolean,
    connectionTimeout:number,
    writeTimeout:number,
}

export function getEmailConfig():Promise<baseResponse<emailType>> {
    return useAxios.get('/api/system/email')
}
