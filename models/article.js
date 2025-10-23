const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: false,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("article", articleSchema);
