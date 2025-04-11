import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import foodRouter from "./routes/foodRoute.js";
dotenv.config();

//app config

const app = express();
const Port = 4000;

//middlewares
app.use(express.json());
app.use(cors());


//db connection
connectDB()

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(Port, () => {
  console.log(`Server started on http://localhost:${Port}`);
});
