 
import { pool } from "../../db/index.js";
import type { IIssue } from "./issue.interface.js";

const createIssueIntoDB = async(payload : IIssue,id :string)=>{
    const {title,description,type,status} = payload;
    try {
       const result = await pool.query(`
           insert into issues(title,description,type,status,reporter_id) values($1,$2,$3,coalesce($4,'open'),$5) returning *
         `,[title,description,type,status,Number(id)]) 
       return result;
    } catch (error) {
       throw new Error('Fail to create issue!!')
    }
}
 

export const issueService = {
   createIssueIntoDB,
}