import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/db.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

import authRoutes from "./routes/Auth.routes.js"
app.use("/auth",authRoutes );

app.listen( port, (req, res) =>{
    console.log(`port running at ${port}`)
} )
connectDB();
