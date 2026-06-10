import express, { type Application, type Request, type Response } from "express";
import { authRouter } from "./Module/auth/auth.route.js";

const app :Application = express()

// app.use(cookiePerser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.text())


app.get('/',(req : Request, res : Response)=>{

    res.status(200).json({
       message : "Express server",
       author : "Dipongkar Barmon"
    })
})

app.use('/api/auth',authRouter)

export default app;