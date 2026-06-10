import jwt, {} from 'jsonwebtoken';
import config from "../config/index.js";
import { pool } from "../db/index.js";
export const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            let token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access!!"
                });
            }
            //  console.log(token)
            // console.log(config.secret)
            const decode = jwt.verify(token, config.secret);
            // console.log(decode)
            const userData = await pool.query(`
           select * from users where id=$1
          `, [decode.id]);
            if (userData.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not fatch from decode data!'
                });
            }
            const user = userData.rows[0];
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden! This role have no access!'
                });
            }
            req.user = decode;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
//# sourceMappingURL=auth.js.map