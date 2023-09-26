import mongoose from "mongoose";
import Driver from "./Driver";
import Vehicle from "./Vehicle";

const inputOutputSchema = new mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: Driver, required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: Vehicle, required: true },
    register_at: { type: Date },
    odometer: { type: Number, required: true },
    description: { type: String, default: null },
    destination: { type: String },
    status: { type: String, enum: ["input", "output"], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  });
  
  const InputOutput = mongoose.models.Input_output || mongoose.model('Input_output', inputOutputSchema);
  export default InputOutput 