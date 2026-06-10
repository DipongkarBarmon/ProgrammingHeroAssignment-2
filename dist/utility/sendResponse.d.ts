import type { Response } from "express";
type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
    error?: any;
};
declare const sendResponse: <T>(res: Response, data: TResponse<T>) => Response<any, Record<string, any>>;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map