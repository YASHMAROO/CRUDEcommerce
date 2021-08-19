const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const productRoutes=require('./routes/product');
const wishlistRoutes=require('./routes/wishlist');
const cartRoutes=require('./routes/cart');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true, useNewUrlParser: true} ,() => {
    console.log('Connected to database');
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', productRoutes);
app.use('/', wishlistRoutes);
app.use('/', cartRoutes);

const PORT=process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})
