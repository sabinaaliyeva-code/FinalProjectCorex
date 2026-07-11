const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productRouter = require('./routes/product.routes');
const userRouter = require('./routes/user.routes');
const cors = require('cors');
const cartRouter = require('./routes/cart.routes');
const wishlistRouter = require('./routes/wishlist.route');
const categoryRouter = require('./routes/category.routes');


//Load environment variables
dotenv.config();

//create server
const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use(productRouter);
app.use(userRouter);
app.use(cartRouter);
app.use(wishlistRouter);
app.use(categoryRouter);


//Connect to MongoDB
mongoose.connect(process.env.DB_BASE_URL).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.error(`Error connecting to MongoDB: ${error}`);
})