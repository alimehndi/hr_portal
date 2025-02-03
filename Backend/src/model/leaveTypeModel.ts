import mongoose from "mongoose";

const leaveTypeSchema = new mongoose.Schema({
    leaveTypeId:
        { type: String },
    leaveType:
    {
        type: String
        , required: true
    }
})


export default leaveTypeSchema;