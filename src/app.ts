import express, { type Application, type Request, type Response } from "express";
import { authRouter } from "./Module/auth/auth.route.js";
import cors from 'cors'
import globalErrorHandler from "./Middleware/globalErrorHandler.js";
const app :Application = express()

// app.use(cookiePerser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.text())
app.use(cors({
      origin: 'http://localhost:3000',
    }))


app.get('/',(req : Request, res : Response)=>{

    res.status(200).json({
       message : "Express server",
       author : "Dipongkar Barmon"
    })
})

app.use('/api/auth',authRouter)


app.use(globalErrorHandler)

export default app;