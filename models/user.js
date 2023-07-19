const mongoose=require('mongoose')
const ush=mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

folders: [{
foldername: {
    type:String
    
},
// taskn: [{
//    taskname:  {
//     type: String,
//     ref:'tms'

// }}]

}
]



})
const ums=mongoose.model("ums",ush)
module.exports=ums