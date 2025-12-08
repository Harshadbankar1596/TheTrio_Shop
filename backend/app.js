import dotenv from "dotenv";
dotenv.config();
import express from "express";
import routes from "./routes/index.js";
import connectDB from "./config/db.js";
import cors from "cors";


const app = express();
app.use(cors({origin : ["http://localhost:5173" , "https://thetrio-shop-frontend.onrender.com"], credentials : true}));
app.use(express.json());
await connectDB();

app.use("/api", routes);

export default app;