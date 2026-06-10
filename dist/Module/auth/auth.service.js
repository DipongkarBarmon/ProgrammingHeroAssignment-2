import config from "../../config/index.js";
import { pool } from "../../db/index.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSignupIntoDB = async (payload) => {
    try {
        const { name, email, password, role } = payload;
        const hassPassword = await bcrypt.hash(password, 10);
        //  console.log(name,email,role)
        const result = await pool.query(`
                insert into users(name,email,password,role) values($1,$2,$3,coalesce($4,'contributor')) returning *
            `, [name, email, hassPassword, role]);
        // console.log(result)
        delete result.rows[0].password;
        return result;
    }
    catch (error) {
        // console.log(error)
        throw error;
    }
};
const userLoginFromDB = async (payload) => {
    try {
        const { email, password } = payload;
        if (email === undefined || password === undefined) {
            throw new Error("Invalid credentails!");
        }
        const userData = await pool.query(`
              select * from users where email=$1
          `, [email]);
        const user = userData.rows[0];
        if (user === undefined) {
            throw new Error('User not found for this credentails!');
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            throw new Error('Password not match!');
        }
        const jwtPayload = {
            id: user.id,
            name: user.name,
            role: user.role
        };
        const token = jwt.sign(jwtPayload, config.secret, { expiresIn: '1d' });
        // const refreshToken = jwt.sign(jwtPayload,config.refresh_secret as string,{expiresIn :'10d'})
        delete user.password;
        return { token, user };
    }
    catch (error) {
        throw error;
    }
};
export const authService = {
    userSignupIntoDB,
    userLoginFromDB
};
//# sourceMappingURL=auth.service.js.map