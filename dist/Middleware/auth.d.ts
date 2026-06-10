import type { NextFunction, Request, Response } from "express";
import type { Role } from "../type/index.js";
export declare const auth: (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.d.ts.map