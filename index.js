const mongoose = require("mongoose");
const express = require("express");
const productRoute = require("./routes/product.route.js")
const authRoute = require("./routes/auth.route.js")
const Product = require('./models/product.model.js')                                       
const cartRoutes= require('./routes/cart.route.js')
const app = express();
const addressRoutes = require('./routes/address.route.js');
require('dotenv').config();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));



//routes
app.use("/api/products" , productRoute);
app.use("/api/auth" , authRoute);
app.use("/api/cart" , cartRoutes);
app.use('/api/address', addressRoutes); 



app.get("/", (req, res) => {
  res.send("node.js chal rha  bhai");
});




mongoose
  .connect(
    "mongodb+srv://priyanshuverma1:Priyasnhu014@cluster0.oy19g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("connection failed!");
  });
