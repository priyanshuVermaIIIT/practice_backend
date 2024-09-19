const User = require('../models/user.model');
const Product = require('../models/product.model');

exports.addToCart = async(req,res)=>{

    const {productId , quantity  } = req.body;
    console.log(req.body)
    try {
        console.log('Request body:', req.body);
        //Find the user
        const user = await User.findById(req.user.id)
            if(!user){
                return res.status(404).json({message:"User not found"});
            }
        //Find the product
            const product = await Product.findById(productId);
            if(!product){
                return res.status(404).json({message:"Product not found"});
            }
        //Check the product is laready in the cart 
        const cartItem = user.cart.find(item=>item.productId.toString()=== productId);
        if(cartItem){
            cartItem.quantity += quantity;
        } else{
            user.cart.push({productId , quantity , price:product.price });
        }

        await user.save();
        res.status(200).json(user.cart);
        }
        
    catch (error) {
        res.status(500).json({message:error.message});
    };

};

exports.viewCart = async(req , res)=>{
    try {
        const user = await User.findById(req.user.id).populate('cart.productId');
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
           res.status(200).json (user.cart);
      
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}