import mongoose from "mongoose";

const inputOuputSchema = new mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    datetime_input: { type: Date },
    datetime_output: { type: Date },
    odometer: { type: Number, required: true },
    description: { type: String, required: true },
    destiny: { type: String, required: true },
    status: { type: String, enum: ["E", "S"], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  });
  
  const InputOuput = mongoose.models.InputOuput || mongoose.model('InputOuput', inputOuputSchema);
  export default InputOuput 