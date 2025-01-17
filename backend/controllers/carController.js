const Car = require('../models/cars'); 

const registerCar = async (req, res) => {
  try {
    const { carName, brand, pricePerDay, available, imageUrl } = req.body;
    if (!carName || !brand || !pricePerDay) {
      return res.status(400).json({ message: 'Name, brand, and pricePerDay are required.' });
    }
    const newCar = new Car({
      carName,
      brand,
      pricePerDay,
      available,
      imageUrl,
    });
    const savedCar = await newCar.save();
    res.status(201).json({ message: 'Car registered successfully.', car: savedCar });
  } catch (error) {
    res.status(500).json({ message: 'Error registering car.', error: error.message });
  }
};

const removeCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }
    await Car.findByIdAndDelete(carId);
    res.status(200).json({ message: 'Car removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing car.', error: error.message });
  }
};

const ListCars = async (req, res) => {
  try {
    const cars = await Car.find();
    if (cars.length > 0) {
        res.status(200).json(cars);
        console.log(cars);
    } else {
      res.status(404).json({message: "No cars are found"});
      console.log('No cars found')
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car list.', error: error.message });
  }
}

const CarbyId = async (req, res) => {
  try {
    const { carId } = req.params;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car details.', error: error.message });
  }
}
module.exports = {
  registerCar,
  removeCar,
  ListCars,
  CarbyId,
};
