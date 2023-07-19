const express=require('express')
const router=express.Router()
const ums=require('../models/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const {userAuth}=require('../middleware/userAuth')
const Errorhandler=require('../utils/Errorhandler')
const catchAsyncError=require('../middleware/catchAsyncError')

router.post('/createUser', catchAsyncError( async (req,res,next)=>{
const {name,email,password}=req.body
const folders=[{
    foldername: `${name} - My home`
}]


const hashp=await bcrypt.hash(password,8)
const newU=new ums({
    name,
    email,
    password:hashp,
    folders: folders[0]
})
const Foltoken=jwt.sign({ name: folders[0].foldername}, process.env.folder_secret, {expiresIn: '1d'}  )
res.cookie('folder', Foltoken,{ httpOnly:true, Secure:true,  expires: new Date(Date.now()+ 24*60*60*1000)})
const sav=await newU.save()
res.status(201).json({
    success:true,
sav
})

}) )

router.get('/Getallusers', catchAsyncError(async (req,res,next)=>{
const users=await ums.find({})
if(!users){
return next(new Errorhandler("No users found", 200))

}
const uc=await ums.countDocuments()
res.status(201).json({
    success:true,
    uc,
    users
})
}))

router.post('/userLogin', catchAsyncError(async (req,res,next)=>{
const {email,password}=req.body
const user=await ums.findOne({email})
if(!user){
    return next(new Errorhandler("No user found, you are missing", 404))
}
const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch){
    return next(new Errorhandler("Passwords did'nt match", 404))
}
const token=jwt.sign({ id:user._id}, process.env.jwt_secret, {expiresIn:'1d'})


res.cookie('actjwt', token, {httpOnly:true, expires:new Date(Date.now()+24*60*60*1000)}).status(200).json({
    success:true,
    "In": "You are In",
    user
})
}))

router.get('/Logout', userAuth, catchAsyncError(async (req,res,next)=>{
res.clearCookie('actjwt')
res.clearCookie('folder')
res.status(200).json({
    success:true,
    message: "Logged out"

})
}))

router.get('/getMyProfile',userAuth, catchAsyncError(async(req,res,next)=>{
const mu=await ums.findById(req.user._id)
if(!mu){
    return next(new Errorhandler('You are missing',  404))
}
res.status(201).json({
    success:true,
    mu
})


}))


module.exports=router