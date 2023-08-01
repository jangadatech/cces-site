import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    name: { type: String },
    full_name: { type: String },
    active: { type: Boolean, default: true  },
    enrollment: { type: String, unique: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  });
  
  const Driver = mongoose.models.Driver || mongoose.model('Driver', driverSchema);
  export default Driver 