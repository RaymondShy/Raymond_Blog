import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index.ts";
import type {userInfoType} from "@/api/user_api.ts";

export interface carouselImageType{
    carouselId:number
    carouselTitle:string
    imageUrl:string
}

export interface promotionType{
    carouselId:number
    imageUrl:string
    carouselTitle:string
    linkUrl:string
    sortOrderNum:string
    status:string
    carouselTime:number
    updateTime:string
}

export function getCarouselImageNameList():Promise<baseResponse<carouselImageType[]>>{
    return useAxios.get("/api/system/carousel/image_names")
}

export function getPromotionApi(params:paramsType):Promise<baseResponse<listDataType<promotionType>>> {
    return useAxios.get("/api/system/carousel/search", {params:params})
}
