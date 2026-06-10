import type { Request, Response } from "express";
import { issueService } from "./issue.service.js";
import sendResponse from "../../utility/sendResponse.js";


const createIssue = async(req : Request,res:Response)=>{
    try {
       const result = await  issueService.createIssueIntoDB(req.body,req.user.id)
       sendResponse(res,{
         statusCode:200,
         success : true,
         message : "Issue created successfully",
         data : result.rows[0]
       })
       
    } catch (error : any) {
      sendResponse(res,{
            statusCode:500,
           success: false,
           message : error.message,
           error : error
       })
        
    }
}

const getAllIssue = async(req : Request,res:Response)=>{
    try {
       const {sort,type,status} = req.query ;

       const result = await issueService.getAllIssueFromDB(sort as string)

       let userResponse = await issueService.getUserResponse(result)

       if(type && (type === 'bug' || type === "feature_request") ){
           userResponse = userResponse.filter((issue)=>{
            return issue.type === type
          })
       }

       if(status && (status === 'open' || status === 'in_progress' || status === 'resolved') ){
          userResponse = userResponse.filter((issue)=>{
             return issue.status === status
          })
       }

       sendResponse(res,{
         statusCode:200,
           success : true,
           message : 'Issues retrived successfully',
           data : userResponse
      })
       
        
    } catch (error : any) {
       sendResponse(res,{
         statusCode:500,
           success : true,
           message : error.message,
           error : error
        })
    }
}
const getIssueBySingleUser = async(req : Request,res:Response)=>{
     const {id} = req.params
     try {
      const result = await issueService.getSingleIssueFromDB(id as string)

      const userResponse = await issueService.getUserResponse(result.rows)

      sendResponse(res,{
         statusCode:200,
          success : true,
          message : "Issue retrived successfully",
          data : userResponse
       })

     } catch (error : any) {
      sendResponse(res,{
         statusCode:500,
         success : false,
         message : error.message, 
         error:error 
       })
     }
}
const deleteIssue = async(req: Request , res:Response)=>{
     try {
         const {id} =req.params;
         await issueService.deleteIssueFromBD(id as string)

         sendResponse(res,{
            statusCode:200,
            "success": true,
            "message": "Issue deleted successfully"
         })
          
     } catch (error : any) {

       sendResponse(res,{
           statusCode:200,
          success : false,
          message : error.message,
          error :error
        })
     }
}
 
export const issueController ={
   createIssue,
   getAllIssue,
   getIssueBySingleUser,
   deleteIssue,
   
}