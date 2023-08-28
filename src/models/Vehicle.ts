import { Schema, model, models } from "mongoose";

const VehicleSchema = new Schema({
    plate: { type: String, required: true },
    active: { type: Boolean, default: true  },
    prefix: { type: String, required: true },
    vehicleType: { type: Schema.Types.ObjectId, ref: "VehicleType" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  });
  
  const Vehicle = models.Vehicle || model('Vehicle', VehicleSchema);
  export default Vehicle 