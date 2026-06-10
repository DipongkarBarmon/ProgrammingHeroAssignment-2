import type { IUser } from "./auth.interface.js";
export declare const authService: {
    userSignupIntoDB: (payload: IUser) => Promise<import("pg").QueryResult<any>>;
    userLoginFromDB: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        token: string;
        user: any;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map