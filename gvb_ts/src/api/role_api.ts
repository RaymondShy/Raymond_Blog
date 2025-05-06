import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index.ts";

export interface roleType {
    roleId:number
    roleName:string
    description:string
    roleCode:number
}

// 查询所有角色
export function getRoleList():Promise<baseResponse<listDataType<roleType>>> {
    return useAxios.get("/api/system/role")
}
