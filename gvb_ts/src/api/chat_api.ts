import {type baseResponse, useAxios} from "@/api/index.ts";

export function getChatMessage(message:string) :Promise<string>{
    return useAxios.get('/api/ai/generate',{params:{message:message}});
}
