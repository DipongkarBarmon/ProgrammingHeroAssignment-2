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

const userLogin =async(req : Request, res: Response)=>{
   try {
      const result = await authService.userLoginFromDB(req.body)

      // const {token} = result;
      // res.cookie('token',token,{
      //   secure: true,
      //   httpOnly: true,
      //   sameSite:"lax"
      // })
       sendResponse(res,{
         statusCode:200,
           success: true,
           message : "Login successful",
           data : result 

       })
       
   } catch (error : any) {
       sendResponse(res,{
         statusCode:500,
         success : false,
         message:error.message,
         error: error
       })
        
   }
}

 
export const authController ={
   userSignup,
   userLogin
}