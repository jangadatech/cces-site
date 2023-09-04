import { Schema, model, models } from "mongoose";

const VehicleSchema = new Schema({
    plate: { type: String, required: true },
    active: { type: Boolean, default: true  },
    prefix: { type: String, required: true },
    vehicle_type_id: { type: Schema.Types.ObjectId, ref: "VehicleType" },
    status: { type: String, required: true, enum: ["input", "output"], default: "input" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  });
  
  const Vehicle = models.Vehicle || model('Vehicle', VehicleSchema);
  export default Vehicle 