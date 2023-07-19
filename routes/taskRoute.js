const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const tms=require('../models/task')
const ums=require('../models/user')
const Errorhandler=require('../utils/Errorhandler')
const catchAsyncError=require('../middleware/catchAsyncError')
const {userAuth}=require('../middleware/userAuth')

router.post('/createTask', userAuth, catchAsyncError(async (req,res,next)=>{
const {folder}=req.cookies
const {tname,statuss}=req.body
if(!folder){
    return next(new Errorhandler('Currently, no folder is open', 404))
}
const decoded=jwt.verify(folder,process.env.folder_secret)
if(!decoded){
    
    return next(new Errorhandler('No shell in folder', 404))
}
let isMatch=req.user.folders.find(obj=>obj.foldername===decoded.name)
const newT=new tms({
    tname,
    statuss,
    userId:req.user._id,
    inFolder: isMatch._id,
    userName:req.user.name,
    inFolderName:isMatch.foldername
})

const sendTask=await newT.save()

// const tasknam={
// taskname:tname
// }

// for(let tn of req.user.folders){
//     if(tn.foldername===decoded.name){

//         tn.taskn=tn.taskn.concat({tasknam})

//         await req.user.save()
//     }
// }

// isMatch.taskn=isMatch.taskn.concat({tasknam})
// await req.user.save()

res.status(201).json({
    success:true,
    sendTask,
   tif: req.user.folders
})

}))

router.get('/getAllTasks', userAuth, catchAsyncError(async (req, res,next)=>{
const tasks=await tms.find({})
if(!tasks){
    return next(new Errorhandler("No tasks found", 404))
}
res.status(201).json({
    success:true,
    tasks
})


}))


router.get('/getTaskById/:name', userAuth, catchAsyncError(async (req,res,next)=>{
const tasksbyuser=await tms.find({userId:req.user._id})
const cert=tasksbyuser.find(obj=> obj.tname===req.params.name)
if(!cert){
    return next(new Errorhandler("This task doesnot belong to you", 404))
}
res.status(201).json({
    success:true,
    YourRequestedTask: cert
})






}))

router.get('/useofpopulate', userAuth, catchAsyncError(async (req,res,next)=>{
const watwat=await tms.findOne({userId: req.user._id}).populate("userId" , " name email")
res.status(201).json({
    success:true,
    watwat
})

}))












module.exports=router