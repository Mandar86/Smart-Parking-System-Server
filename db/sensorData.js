import mongoose from "mongoose";

let schema = new mongoose.Schema(
    {
        data:{
            type: String
        },
        location:{
            type:String,
            default:"COEP"
        },
        timeStamp : {
            type: mongoose.Schema.Types.Date
        }
    }
)
const Sensor = mongoose.model("Sensor",schema);
export default Sensor;