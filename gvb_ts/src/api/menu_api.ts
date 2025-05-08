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
