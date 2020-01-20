const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  prodname: { type: String, required: true },
  username: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: false },
  date: { type: Date, required: true },
  category: { type: String, required: false },
  isSold: { type: Boolean, required: false },
  image: { type: String, required: true }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
