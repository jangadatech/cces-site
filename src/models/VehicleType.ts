import { Schema, model, models } from "mongoose";

const VehicleTypeSchema = new Schema({
    name: { type: String, required: true },
    seat: { type: Number},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  });
  
  const VehicleType = models.VehicleType || model('VehicleType', VehicleTypeSchema);
  export default VehicleType 