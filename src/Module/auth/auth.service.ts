 
import { pool } from "../../db/index.js";
import type { IUser } from "./auth.interface.js"
import bcrypt from 'bcrypt'
 

  const userSignupIntoDB = async(payload : IUser)=>{
        try {
          const {name, email,password,role} = payload;

          const hassPassword = await bcrypt.hash(password,10);
          
          console.log(name,email,role)

          const result = await  pool.query(`
                insert into users(name,email,password,role) values($1,$2,$3,coalesce($4,'contributor')) returning *
            `,[name,email,hassPassword,role])

            // console.log(result)
            delete result.rows[0].password
            return result;
          
        } catch (error) {
          // console.log(error)
          throw  error;
        }
  }
 
export const authService = {
   userSignupIntoDB,


}