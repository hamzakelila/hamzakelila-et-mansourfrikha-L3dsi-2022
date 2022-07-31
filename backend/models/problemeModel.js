const mongoose = require("mongoose");

const problemeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    niveau: {
      type: String,
      // required: true,
      default: "facile",
    },
    nbrtest: {
      type: Number,
      // required: true,
      
    },
  },
  {
    timestamps: true,
  }
);

const Probleme = mongoose.model("Probleme", problemeSchema);

module.exports = Probleme;
