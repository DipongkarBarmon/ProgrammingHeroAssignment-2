import { Pool } from "pg";
import config from "../config/index.js";
export const pool = new Pool({
    connectionString: config.connectionstring
});
export const initDB = async () => {
    try {
        await pool.query(`
          CREATE TABLE IF NOT EXISTS users (
              id SERIAL PRIMARY KEY,
              name VARCHAR(50) NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              password TEXT NOT NULL,
              role VARCHAR(20) DEFAULT 'contributor'
                  CHECK (role IN ('contributor', 'maintainer')),
              created_at TIMESTAMP DEFAULT NOW(),
              updated_at TIMESTAMP DEFAULT NOW()
          )
          `);
        await pool.query(`
             CREATE TABLE IF NOT EXISTS issues (
            id SERIAL PRIMARY KEY,
            title VARCHAR(150) NOT NULL,
            description TEXT NOT NULL,
            type VARCHAR(20)
                CHECK (type IN ('bug', 'feature_request')) NOT NULL,
            status VARCHAR(20) DEFAULT 'open'
                CHECK (status IN ('open', 'in_progress', 'resolved')),
            reporter_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            );  
          `);
        console.log('Database connect successfully!');
    }
    catch (error) {
        console.log('Database fail to connect successfully!');
    }
};
//# sourceMappingURL=index.js.map