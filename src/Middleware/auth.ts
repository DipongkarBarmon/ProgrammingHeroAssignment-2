import type { NextFunction, Request, Response } from "express"
 
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from "../config/index.js"
import { pool } from "../db/index.js"
import type { Role } from "../type/index.js"
 


export const auth = (...roles: Role[])=>{
   return async(req: Request,res:Response,next :NextFunction)=>{
       try {
          let token = req.headers.authorization;
          
          if(!token){
             return res.status(401).json({
               success : false,
               message: "Unauthorized access!!"
             })
          }
         //  console.log(token)
         // console.log(config.secret)
         const decode = jwt.verify(token ,config.secret as string) as JwtPayload
         // console.log(decode)
         const userData = await pool.query(
          `
           select * from users where id=$1
          `,
          [decode.id]
         )
         

          if(userData.rows.length === 0){
            return res.status(404).json({
               success : false,
               message : 'User not fatch from decode data!'
             })
          }

          const user =userData.rows[0]

          if(roles.length && !roles.includes(user.role)){
            return res.status(403).json({
               success : false,
               message : 'Forbidden! This role have no access!'
            })
          }
          req.user = decode
          next();
       } catch (error) {
         next(error)
       }
   }
} 