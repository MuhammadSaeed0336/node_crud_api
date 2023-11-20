
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get('/', (req, res) => {
    res.send("Hello SZ")
})

//get all Products
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//get Product By Id
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Add product
app.post('/products', async(req, res) => {
      try {
         const product  = await Product.create(req.body);
        res.status(200).json({message: `Added Product Successfully`});
      } catch (error) {
        // console.log(error.message);
        res.status(500).json({message: error.message})
      }
})

//Update or edit product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
       const product  = await Product.findByIdAndUpdate(id, req.body);
       if(!product){
           return res.status(404).json({ message: `Product not found with ID ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json({message: `Update Successfully`});
    } catch (error) {
      // console.log(error.message);
      res.status(500).json({message: error.message})
    }
})

//Delete or Remove product
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
       const product  = await Product.findByIdAndDelete(id, req.body);
       if(!product){
           return res.status(404).json({ message: `Product not found with ID ${id}` });
        }
        res.status(200).json({message: `Delete Successfully`});
    } catch (error) {
      // console.log(error.message);
      res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose
.connect('mongodb+srv://saeed:saeed123@cluster0.9vdhpbq.mongodb.net/crud')
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(8000, () => {
        console.log("Node Api is running on port 8000")
    });
}).catch((err) => {
    console.log(err)
});