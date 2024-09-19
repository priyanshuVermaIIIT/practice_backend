const { timeStamp } = require("console");
const mongoose = require("mongoose");

const ProductSchemma = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please enter product name "],
    },

    

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
      require: false,
    },
  },

  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", ProductSchemma);
module.exports = Product;
