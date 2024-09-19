const Product = require("../models/product.model")

const findProducts = async (req , res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id );
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getProducts = async(req ,res)=>{
    try {
        const Products = await Product.find({});
        res.status(200).json(Products);
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}

const updateProduct = async (req, res)=>{
    try {
        const {id} = req.params;
       const product =  await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message : " Product not found my friend  "})
        }

        const updatedProduct = await Product.findById(id);
        return res.status(200).json(updatedProduct)


    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addProduct = async(req , res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message: "Product is not here my friend"})
        }
        res.status(200).json({message:"Product deleted sucessfully"})

        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    getProducts , findProducts , deleteProduct , updateProduct , addProduct
}