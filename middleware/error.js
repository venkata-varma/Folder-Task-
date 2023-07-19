const Errorhandler=require('../utils/Errorhandler')
module.exports=(err,req,res,next)=>{
err.message=err.message || "Internal see"
err.statuscode=err.statuscode || 500
res.status(err.statuscode).json({
    success:false,
    message:err.message
})

}