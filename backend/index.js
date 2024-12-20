const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8001;
app.use(cors());
// Database connection
mongoose.connect(
  'mongodb+srv://Greatstackdev:Gurmeet%40123@cluster0.jxhku5k.mongodb.net',
);
app.use(bodyParser.json());
// API creation
app.get('/', (req, res) => {
  res.send('Express is running ');
});

//Image storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});
app.use('/images', express.static('upload/images'));
const upload = multer({ storage: storage });
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`,
  });
});
// End point for all products
app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  console.log(products);
  res.json(products);
});

//End point for women
app.get('/women', async (req, res) => {
  let product = await Product.find({ category: 'women' });
  res.send(product);
});
//Endpint for kids
app.get('/kids',async(req,res)=>{
  let product = await Product.find({category:'kids'});
  res.send(product);
  
})
//Endpoint for men
app.get('/men',async(req,res)=>{
  let product = await Product.find({category:'men'})
  res.send(product);
})
// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res
      .status(401)
      .send({ errors: 'Please  authenticate  using valid credentials  ' });
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: 'please authenticate using valid credentials ' });
    }
  }
};
// End point for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log('Request body:', req.body); 
  let userData = await Users.findOne({ _id: req.user.id });
  console.log('Id coming from frontend', req.body.itemID);
   if (!req.body.itemID) {
    return res.status(400).send({ errors: 'ItemID is required' });
  }
  userData.cartData[req.body.itemID] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData },
    res.send('Added'),
  );
});

// End point to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemID] > 0) {
    userData.cartData[req.body.itemID] -= 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData },
    res.send('Added'),
  );
});

// Creating endpoint to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});
// schema for creating for user model
const Users = mongoose.model('Users', {
  name: { type: String },
  email: {
    type: String,
    unique: true,
  },
  password: { type: String },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    Default: Date.now,
  },
});

// End point for signup

app.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: 'User alreadt existed ' });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: { id: user.id },
  };
  const token = jwt.sign(data, process.env.JWT_SECRET);
  res.json({ success: true, token });
});

// End point for login

app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: { id: user.id },
      };
      const token = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: 'wrong password' });
    }
  } else {
    res.json({ success: false, errors: 'wrong email' });
  }
});

// End point for adding data to database
app.post('/addproduct', async (req, res) => {
  console.log('The data from frontend is ', req.body);
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log('The data from user', product);
  await product.save();
  console.log('saved');
  res.json({
    success: 1,
    name: req.body.name,
  });
});

// To remove product from database
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log('Remove Cart');
  res.json({
    success: true,
    name: req.body.name,
  });
});

// schema for creating Products
const Product = mongoose.model('Product', {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});
// Creating endpoint for login
app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
});
app.listen(port, (error) => {
  if (!error) {
    console.log('Server is Runnng on port ' + port);
  } else {
    console.log('Error ' + error);
  }
});
