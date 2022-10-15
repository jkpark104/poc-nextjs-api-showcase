import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  username: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
