import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 60,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    required: true
  },
  ownerBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Project = mongoose.model("Project", projectSchema)

export default Project;
