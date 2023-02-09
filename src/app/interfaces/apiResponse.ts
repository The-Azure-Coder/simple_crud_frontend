export interface APIResponse<Type = any> {
    status: number;
    data: Type;

}