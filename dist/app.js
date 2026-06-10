import express, {} from "express";
import { authRouter } from "./Module/auth/auth.route.js";
import cors from 'cors';
import globalErrorHandler from "./Middleware/globalErrorHandler.js";
import { issueRouter } from "./Module/issue/issue.route.js";
const app = express();
// app.use(cookiePerser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Express server",
        author: "Dipongkar Barmon"
    });
});
app.use('/api/auth', authRouter);
app.use('/api/issues', issueRouter);
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map