import type {baseResponse} from "@/api/index";
import {useAxios} from "@/api/index";

export interface loginEmailType {
    userName: string
    password: string
}

export function loginEmailApi(request: loginEmailType): Promise<baseResponse<string>> {
    return useAxios.post("/api/email_login")
}
