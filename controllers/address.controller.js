const User = require('../models/user.model');

//add a new address to a user profile :-
exports.addAddress = async(req , res)=>{
    const {street , city , postalCode , country } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        //add the new address to the user address array
        user.addresses.push({street , city , postalCode , country});
         
        
        //save the updated user with the new address
        await user.save();

        res.status(200).json(user.addresses)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};

exports.veiwAddress = async(req , res)=>{
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res .status(404).json({message : "User not found"});
        }

        //soft delete function
        const addresses = user.addresses.filter(address => !address.isDeleted);

        res.status(200).json(addresses);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.deleteAddress = async (req , res)=>{
    const { index} = req.params;
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.statu(404).json({message : "User not found "});
        }
    if(index<0 || index >= user.addresses.length){
        return res.status(400).json({message : "Invalid address index"});
    }

    //set the booloean true to delete (soft)
    user.addresses[index].isDeleted = true;

    await user.save();
    res.status(200).json({message : "Address soft deleted successfully" , addresses:user.addresses});
    
    } catch (error) {
        res.status(500).json({message : error.message});
    };
};

exports.editAddress = async (req , res)=>{
    const {index} = req.params;
    const {street , city , postalCode , country} = req.body;

    try {
        const user = await User.findById(req.user.id);

        //User check
        if(!user){
            return res.statu(404).json({message : "User not found "});
        }

        //index check 
    if(index<0 || index >= user.addresses.length){
        return res.status(400).json({message : "Invalid address index"});
    }
     
    // chagnge of data according to body  
    user.addresses[index]={
        street : street ||user.addresses[index].street,
        city: city || user.addresses[index].city,
        postalCode: postalCode || user.addresses[index].postalCode,
        country: country || user.addresses[index].country,
    };
        
    await user.save();
    res.status(200).json({ message: 'Address updated successfully', addresses: user.addresses });

    } catch (error) {
         res.status(500).json({message: error.message});
    }
}