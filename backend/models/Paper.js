import mongoose from "mongoose";

const PaperSchema = new mongoose.Schema({
  paperId: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  pdfLink: {
    type: String,
  },
  categories: {
    type: [String],
    required: true,
  },
  published: {
    type: String,
    required: true,
  },
});

const Paper = mongoose.model("Paper", PaperSchema);

export default Paper;
