import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    plate: { type: String, required: true },
    active: { type: Boolean, default: true  },
    prefix: { type: String, required: true },
    vehicle_type: { type: mongoose.Schema.Types.ObjectId, ref: "VehicleType", required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  });
  
  const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
  export default Vehicle 