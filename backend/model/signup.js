import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 20,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple regex for email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, // Ensures at least one letter & one number
  },

});

const User = mongoose.model("User", UserSchema);

export default User;
