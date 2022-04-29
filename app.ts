import * as dotenv from "dotenv";
const express =require("express");
import * as bodyParser from "body-parser";
import {orderRouter} from "./routes/orderRouter";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/orders", orderRouter);

app.listen(process.env.PORT, () => {
console.log("Node server started running");
});