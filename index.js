import express, { response } from "express";


import mongoose from "mongoose";
import dotenv from "dotenv"
import Sensor from "./db/sensorData.js"

dotenv.config();
const DB_PATH = process.env.DB_PATH;



mongoose
  .connect(DB_PATH,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error occurred : \n", err);
  });
const app = express();

// constants
const PORT = process.env.PORT || 9000;
// middlewares
app.use(express.json());

// routes
app.get("/", async (req, res) => {
  Sensor.find()
  .then((response)=>{
    let a = [...response]
    // console.log(response)
    res.send(`Status is:${a[a.length-1].data}`)
  })
  .catch((err)=>{
    console.log(err)
  })
});

app.get("/data/:data", async (req, res) => {
let {data} = req.params;
// data = Number(data)
// console.log(typeof(data))
let sensor = new Sensor({
  data :data,
  timeStamp: new Date()
})
console.log(sensor)

sensor.save()
.then((response)=>{
  res.send(response)
})
});
app.listen(PORT, () => console.log("Listening on port", PORT));
