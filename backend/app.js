import dotenv from "dotenv";
dotenv.config();
import express from "express";
import routes from "./routes/index.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";




const app = express();
app.use(cors({origin : ["http://localhost:5173" , "https://thetrio-shop-frontend.onrender.com" , "https://thetrio-shop-1-admin.onrender.com", "http://localhost:5174"], credentials : true}));
app.use(express.json());
app.use(cookieParser());
await connectDB();

app.use("/api", routes);

export default app;