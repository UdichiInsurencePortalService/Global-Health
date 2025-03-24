const Jio = require('joi')

const signupValidation = (req,res,next)=>{
    const schema = Jio.object({
        name: Jio.string().min(3).max(100).required(),
        email: Jio.string().min(3).required(),
        password: Jio.string().min(4).max(100).required()
    })
    const{error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad request",error})
    }
    next();

}  

const loginValidation = (req,res,next)=>{
    const schema = Jio.object({
        email: Jio.string().min(3).required(),
        password: Jio.string().min(4).max(100).required()
    })
    const{error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad request",error})
    }
    next();

}  

module.exports = {
    signupValidation,
    loginValidation
}