//import {mongoose} from "mongoose"
const mongoose = require('mongoose')
const {Schema} = mongoose

const TaskSchema = new Schema(
    {
        title: String,
        description: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required : true,

        }
    },{
        timestamps:true
    }
)

module.exports = mongoose.model("Task", TaskSchema)