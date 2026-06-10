import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import sendResponse from "../../utility/sendResponse.js";
 
const userSignup= async( req : Request,res:Response)=>{

     try {
       const result =  await authService.userSignupIntoDB(req.body)
       
       if(result.rows.length === 0){
          sendResponse(res,{
           statusCode : 404,
           success : false,
           message : "Can't create user!",
           data :{}
         })
          
       }
       sendResponse(res,{
         statusCode:200,
          success : true,
          message : "User create successfully!",
          data : result.rows[0]
       })
        
     } catch (error: any) {
         sendResponse(res,{
            statusCode:500,
           success: false,
           message: error.message,
           error: error
        })  
     }
}

 
export const authController ={
   userSignup,
}