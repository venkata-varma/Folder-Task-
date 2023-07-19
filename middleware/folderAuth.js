// const UserMod=require('../models/user')
// const Errorhandler=require('../utils/Errorhandler')
// const catchAsyncError=require('../middleware/catchAsyncError')
// const jwt=require('jsonwebtoken')

// const folderAuth=catchAsyncError(async (req,res,next)=>{
// const {folder}=req.cookies
// if(!folder){
//     return next(new Errorhandler('Currently, no folder is open', 404))
// }
// const decoded=jwt.verify(folder,process.env.folder_secret)
// if(!decoded){
    
//     return next(new Errorhandler('No shell in folder', 404))
// }
// const deco=


// })
// module.exports={
//     folderAuth
// }