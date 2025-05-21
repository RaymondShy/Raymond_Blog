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
interface SSl{
    enable: boolean
}
interface StartTls{
    enable: boolean
}
export interface emailType{
    host:string,
    port:number,
    username:string,
    protocol:string,
    nickname:string,
    password:string,
    auth:boolean,
    ssl:SSl,
    startTls:StartTls,
    connectionTimeout:number,
    writeTimeout:number,
}

export function getEmailConfig():Promise<baseResponse<emailType>> {
    return useAxios.get('/api/system/email')
}

export interface ossType{
    endpoint:string,
    accessKeyId:string,
    accessKeySecret:string,
    bucketName:string,
    region:string,
    enable:boolean
}

/**
 * 查询OSS配置
 */
export function getOSSConfig():Promise<baseResponse<ossType>> {
    return useAxios.get('/api/oss')
}
