const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//User register 
const registerUser = async(req, res)=>{
    const {name , email, password } = req.body;
    try {
       const userExits= await User.findOne({email});
        if(userExits){
            return res.status(400).json({message: "User already exits"})
        }
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({name,email,password:hashedPassword });

        //Generate JWT token
        const token = jwt.sign({id : user._id } , process.env.JWT_SECRET , {
            expiresIn: '1h'
        });


        res.status(201).json({
            token , user : {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

     } catch (error) {
        res.status(500).json({message : error.message})
        
    }
};


//Login the User
const loginUser = async(req, res)=>{
    const { email , password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
        return res.status(400).json({message:"user does not exists"});
    
    }
        //check the user Password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });

          res.status(200).json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          });
        } 
            catch (error) {
        res.status(500).json({message:error.message});
    }
};

module.exports = { registerUser, loginUser };