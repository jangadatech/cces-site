import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    full_name: { type: String, required: true },
    active: { type: Boolean, default: true },
    password: String,
    profile: { type: String, enum: ['admin', 'traffic-control', 'human-resources'], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  });
  
  const User = mongoose.models.User || mongoose.model('User', userSchema);
  export default User 