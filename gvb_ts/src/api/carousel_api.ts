import {type baseResponse, useAxios} from "@/api/index.ts";

export interface carouselImageType{
    carouselId:number
    carouselTitle:string
    imageUrl:string
}

export function getCarouselImageNameList():Promise<baseResponse<carouselImageType[]>>{
    return useAxios.get("/api/system/carousel/image_names")
}

