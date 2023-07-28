import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    profile: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
  });
  
  const User = mongoose.models.User || mongoose.model('User', userSchema);
  export default User 