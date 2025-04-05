import { Schema, model, models } from "mongoose";
import User from "./user";

const ProcessTablesSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  processes: { 
    type: [Schema.Types.Mixed], 
    default: [] 
  },
  algorithm: { 
    type: String, 
    required: true 
  },
  timeQuantum: {
    type: Number, 
    required: true 
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, 
{ 
  timestamps: true 
});

const ProcessTables = models.ProcessTables || model("ProcessTables", ProcessTablesSchema);

export default ProcessTables;