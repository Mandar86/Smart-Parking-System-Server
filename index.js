import express, { response } from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import Sensor from "./db/sensorData.js";

import cors from "cors"

dotenv.config();
const DB_PATH = process.env.DB_PATH;

mongoose
  .connect(DB_PATH, {
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
app.use(cors({
  origin:"*"
}))

// routes
app.get("/", async (req, res) => {
  Sensor.find()
    .then((response) => {
      let a = [...response];
      console.log(response)
      // res.send(`Location is : Status is:${a[a.length - 1].data}`);
      res.send(response)
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/data/:data/:location", async (req, res) => {
  let { data, location } = req.params;
  // data = Number(data)
  // console.log(typeof(data))
  //
  let sensor;
  await Sensor.findOneAndUpdate(
    { location: location },
    { $set: { data: data } }
  )
    .then((res) => {
      sensor = res;
      console.log("Response", res);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("Sensor response", sensor);
  if (!sensor) {
    let sensor = new Sensor({
      data: data,
      location: location,
      timeStamp: new Date(),
    });

    sensor.save().then((response) => {
      res.send(response);
    });
  }
  else{
    res.send(sensor)
  }
});
app.listen(PORT, () => console.log("Listening on port", PORT));
