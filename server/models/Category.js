const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Category", CategorySchema);
