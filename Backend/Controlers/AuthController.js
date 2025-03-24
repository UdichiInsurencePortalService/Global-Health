const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserModel = require("../Models/user");

const signup = async(req,res)=>{
    try{
const{name,email,password} = req.body;
const user = await UserModel.findOne({email});
if(user){
    return res.status(400).json({message:"Email already exists",success:false});

    }
    const userModel = new UserModel({name,email,password});
    userModel.Password= await bcrypt.hash(password,10);
    await userModel.save();
    res.status(201)
    .json({message:"Signup Successfully",
        success:true})}
    catch(err){
        res.status(500)
        .json({message:"Internal server error",
            success:false})
    }
}


const login = async(req,res)=>{
    try{
const{email,password} = req.body;
const user = await UserModel.findOne({email});
const errorMsg = "Auth Auth Failed Email and Password is Wrong"
if(!user){
    return res.status(403).json({message:errorMsg,success:false});

    }
    const isPassEqual = await bcrypt.compare(password,user.Password);
    if(!isPassEqual){
        return res.status(403)
        .json({message:errorMsg,success:false});

    }
    const JWTToken = jwt.sign(
        {email: user.email, _id:user._id},
        process.env.JWT_SECERET,
        {expiresIn:"24h"}

    )
    res.status(200)
    .json({message:"login Successfully",
        success:true,
        JWTToken,
        email,
        name: user.name
    
    })}
    catch(err){
        res.status(500)
        .json({message:"Internal server error",
            success:false})
    }
}


module.exports = {
    signup,login
    
}