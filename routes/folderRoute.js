const express=require('express')
const router=express.Router()
const {userAuth}=require('../middleware/userAuth')
const {folderAuth}=require('../middleware/folderAuth')
const Errorhandler=require('../utils/Errorhandler')
const catchAsyncError=require('../middleware/catchAsyncError')
const ums=require('../models/user')
const jwt=require('jsonwebtoken')

router.post('/creatFolder',userAuth, catchAsyncError(async (req,res,next)=>{
const {foldername}=req.body
for(const ob of req.user.folders){
    if(ob.foldername===foldername)
    return next(new Errorhandler("name already exists",404))
}
req.user.folders=req.user.folders.concat({foldername})
req.user.save()
const token=jwt.sign({name:foldername},process.env.folder_secret, {expiresIn: '1d'})
res.status(201).cookie('folder',token,{httpOnly:true, expires:new Date(Date.now()+24*60*60*1000) }).json({
    success:true,
    user:req.user,
    token

})



}))

router.get('/getcookie', userAuth, catchAsyncError(async (req,res,next)=>{
const {folder}=req.cookies
const decoded=jwt.verify(folder,process.env.folder_secret)
const cofname=req.user.folders.find(obj=>obj.foldername===decoded.name)
res.status(201).json({
    success:true,
    message: `${cofname.foldername} is open now`,
    folder
})

}))





router.get('/getmylists',userAuth, catchAsyncError(async (req,res,next)=>{
const lists=await folderMod.findOne({ResuserId:req.user._id}).populate("ResuserId", "name email")
if(!lists){
    return next(new Errorhandler("You have not created any", 404))
}
res.status(201).json({
success:true,
lists
})

}))




router.get('/openCertFolder/:name', userAuth, catchAsyncError(async (req,res,next)=>{
const name=req.params.name
const ofi=req.user.folders.find(obj=>obj.foldername===name)
const token=jwt.sign({name:ofi.foldername}, process.env.folder_secret, {expiresIn:'1d'})
res.status(201).cookie('folder', token,{httpOnly:true,expires:new Date(Date.now()+24*60*60*1000)}).json({
    success:true,
    message:`${ofi.foldername} is now open , please add tasks`,
    token
})
  

}))





module.exports=router