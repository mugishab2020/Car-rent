require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userrouter = require('./routes/userRoutes');
const carRoutes = require('./routes/CarRoutes');
const OrderRoutes = require('./routes/OrderRoutes');

const app = express();

app.use(cors());

app.use(bodyParser.json());


app.use('/api/users', userrouter);
app.use('/api/cars', carRoutes)
app.use('/api/orders', OrderRoutes);

mongoose.connect('mongodb://localhost/car-rental', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');

})
.catch(error => {
    console.error('Error connecting to MongoDB:', error);
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});