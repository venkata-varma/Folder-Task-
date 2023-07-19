const mongoose=require('mongoose')
const tsh=mongoose.Schema({
tname:{
    type:String,
    required:true,
    unique:true
},
statuss:{
    type:Boolean,
    required:true,
    default:false
},
userId:{
    type:mongoose.Schema.ObjectId,
    ref:'ums',
    required:true
},
userName:{
    type:String,
    ref:'ums',
    required:true
},
inFolder:{
type:mongoose.Schema.ObjectId,
ref:'ums',
required:true

},
inFolderName:{
    type:String,
    ref:'ums',
    required:true
}


})
const tms=mongoose.model("tms",tsh)
module.exports=tms