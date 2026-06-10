 
import { pool } from "../../db/index.js";
import type { IIssue, IResponseIssue } from "./issue.interface.js";

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
 
const getAllIssueFromDB = async(sort : string)=>{
   try {
      let query;
      if(sort === "newest"){
          query ='asc'
      }
      else{
         query = "desc"
      }
      const result = await pool.query(`
          select * from issues order by created_at ${query}
      `)
      
      return result.rows;
   } catch (error) {
      throw error;
   }
}

const getUserResponse = async(issues:IResponseIssue[])=>{
    try {     
       const userResponse = await Promise.all(
          issues.map(async(issue) =>{
              const userData = await pool.query(`
                     select * from users where id=$1
                 `,[issue.reporter_id])
               if(userData.rows.length ===0){
                  throw new Error('User not found')
               }
               const user = userData.rows[0];
               return {
                  id :issue.id,
                  title:issue.title,
                  description : issue.description,
                  type: issue.type,
                  status : issue.status,
                  reporter :{
                      id : user.id,
                      name:user.name,
                      role : user.role
                  },
                  created_at : issue.created_at,
                  updated_at : issue.updated_at
               }
          })
       )
       return userResponse;
    } catch (error) {
      throw error;
    }
}
export const issueService = {
   createIssueIntoDB,
   getAllIssueFromDB,
   getUserResponse,
   

}