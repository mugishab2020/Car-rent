const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  brand: { type: String, required: true },
  automatic: { type: Boolean, required: true, default: true },
  speed: { type: Number, required: true, default:160},
  pricePerDay: { type: Number, required: true },
  available: { type: Boolean, default: true },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Car', carSchema);
