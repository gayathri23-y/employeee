import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoute from "./routes/employee.js";


dotenv.config();

const app = express();
const port = 3000;

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/employee', employeeRoute);

app.use((err,req,res,next)=> {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({error : message});
  
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});