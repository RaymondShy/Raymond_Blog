import type {baseResponse, listDataType, paramsType} from "@/api/index.ts";
import {useAxios} from "@/api/index.ts";
import type {userInfoType} from "@/api/user_api.ts";

interface carouseType{
    carouselId:number
    imageUrl:string
}

export interface menuType{
    menuId:number
    menuName:string
    slogan:string
    menuAbstract:string
    menuUrl:string
    menuOrderNum:number
    abstractT:number
    status:string
    createTime:string
    carouselList:carouseType[]
}

export function getMenuList(params:paramsType):Promise<baseResponse<listDataType<menuType>>> {
    return useAxios.get("/api/system/menu/search", {params})
}

export interface menuCreateRequest{
    menuName:string
    slogan:string
    menuAbstract:string
    menuOrderNum:number
    abstractT:number
    status:string
    menuUrl:string
    idList:number[] | []
    menuId?:number
}

/**
 * 新增菜单数据
 * @param data 菜单请求数据
 */
export function createMenuApi(data:menuCreateRequest) :Promise<baseResponse<string>>{
    return useAxios.post(`/api/system/menu/${data.idList}`,data)
}

/**
 * 修改菜单
 */
export function updateMenuApi(idList:number[],data:menuCreateRequest) :Promise<baseResponse<string>>{
    return useAxios.put(`/api/system/menu/${idList}`,data)
}
