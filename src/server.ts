import app from "./app.js"
import config from "./config/index.js"
import { initDB } from "./DB/index.js"

const port = config.port

const main =()=>{
   initDB()
   app.listen(port,()=>{
    console.log(`Server start at : http://localhost:${port}`)
})
}

main()