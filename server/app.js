import dotenv from "dotenv";
dotenv.config({ path: "./routes/.env" });
import express from "express";
import cors from "cors";
import connectDB from "./config/connectdb.js";
import bodyParser from "body-parser"
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js";


const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

//CORS Policy
app.use(cors());

//DATABASE Connection
connectDB(DATABASE_URL);

//JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//ROUTES
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);



//Start Server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


