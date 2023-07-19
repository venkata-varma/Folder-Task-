const ums=require('../models/user')
const jwt=require('jsonwebtoken')
const Errorhandler=require('../utils/Errorhandler')
const catchAsyncError=require('../middleware/catchAsyncError')

const userAuth=catchAsyncError(async(req,res,next)=>{
const {actjwt}=req.cookies
if(!actjwt){
    return next(new Errorhandler("you are not loggedin, Please login",404))
}
const decoded=await jwt.verify(actjwt, process.env.jwt_secret)
if(!decoded){
 return next(new Errorhandler("you ar please login , no decoded",404))   
}
req.user=await ums.findById(decoded.id)
next()

})
module.exports={
    userAuth
}