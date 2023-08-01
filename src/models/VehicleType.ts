import mongoose from "mongoose";

const VehicleTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    seat: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  });
  
  const VehicleType = mongoose.models.Vehicle_type || mongoose.model('Vehicle_type', VehicleTypeSchema);
  export default VehicleType 