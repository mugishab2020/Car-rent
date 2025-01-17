const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  CarId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true , unique: true},
  date_ordered: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
