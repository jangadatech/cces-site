import mongoose from "mongoose";

const VehicleTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    seat: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  });
  
  const VehicleType = mongoose.models.VehicleType || mongoose.model('VehicleType', VehicleTypeSchema);
  export default VehicleType 