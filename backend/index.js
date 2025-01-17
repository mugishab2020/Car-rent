require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userrouter = require('./routes/userRoutes');
const carRoutes = require('./routes/CarRoutes');
const OrderRoutes = require('./routes/OrderRoutes');
const dbConnection = require('./dbconnect.js');

const app = express();

const startServer = async () => {
app.use(cors());
app.use(bodyParser.json());


app.use('/api/users', userrouter);
app.use('/api/cars', carRoutes)
app.use('/api/orders', OrderRoutes);


try {
    await dbConnection();
    console.log('Connected to MongoDB');

} catch(error ) {
   console.error('Error connecting to MongoDB:', error);
};



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

}



startServer();