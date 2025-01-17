const Booking = require('../models/Booking.js'); 

const makeNewOrder = async (req, res) => {
  try {
    const { UserId, CarId, priceperday ,date_ordered, returnDate } = req.body;
    if (!UserId || !CarId || !date_ordered|| !returnDate) {
      return res.status(400).json({ message: 'UserId, carName, carId,date_odered and returnDate should not be null' });
    }
 const parsedPricePerDay = parseFloat(priceperday);
    if (isNaN(parsedPricePerDay) || parsedPricePerDay <= 0) {
      return res.status(400).json({ message: 'priceperday must be a valid positive number.' });
    }

    const orderedDate = new Date(date_ordered);
    const returnD = new Date(returnDate);

    if (isNaN(orderedDate) || isNaN(returnD)) {
      return res.status(400).json({ message: 'Invalid date format for date_ordered or returnDate.' });
    }
    
    const numberOfDays = Math.ceil((returnD - orderedDate) / (1000 * 60 * 60 * 24));
    if (numberOfDays <= 0) {
      return res.status(400).json({ message: 'Return date must be after the order date.' });
    }

    const totalPrice = parsedPricePerDay * numberOfDays;

     const conflictingBooking = await Booking.findOne({
      CarId,
      $or: [
        { date_ordered: { $lte: returnD }, returnDate: { $gte: orderedDate } },
      ],
    });

    if (conflictingBooking) {
      return res.status(400).json({
        message: 'This car is already booked for the selected dates, Try other Cars'
      });
    }
    const newbooking = new Booking({
      UserId,
      CarId, 
      date_ordered: orderedDate,
      returnDate: returnD,
      totalPrice 
    }); 
    const newbook = await newbooking.save();

    res.status(201).json({ message: 'Booked successfully.', Newbooking: newbook });
  } catch (error) {
    res.status(500).json({ message: 'Error trying to make an order.', error: error.message });

  }
};




const OrdersbyUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const order = await Booking.find({ UserId: userId });
    console.log(order)
    if (!order) {
      return res.status(404).json({ message: 'You have not ye made any order ' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car details.', error: error.message });
  }
}
module.exports = {
  OrdersbyUserId,
  makeNewOrder
};
