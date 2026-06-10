import type { IIssue, IResponseIssue } from "./issue.interface.js";
export declare const issueService: {
    createIssueIntoDB: (payload: IIssue, id: string) => Promise<import("pg").QueryResult<any>>;
    getAllIssueFromDB: (sort: string) => Promise<any[]>;
    getUserResponse: (issues: IResponseIssue[]) => Promise<{
        id: string;
        title: string;
        description: string;
        type: string;
        status: string;
        reporter: {
            id: any;
            name: any;
            role: any;
        };
        created_at: Date;
        updated_at: Date;
    }[]>;
    getSingleIssueFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
    updateIssueIntoDB: (payload: IIssue, id: string, issueid: string) => Promise<import("pg").QueryResult<any>>;
    deleteIssueFromBD: (id: string) => Promise<void>;
};
//# sourceMappingURL=issue.service.d.ts.map