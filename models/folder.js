const mongoose=require('mongoose')

const folderSchema=mongoose.Schema({
    Foldername:{
        type:String,
        required:true,
        unique:true
    },
    ResuserId:{
        type: mongoose.Schema.ObjectId,
        ref:'userMod'
    }
})

const folderMod=mongoose.model("folderMod", folderSchema)
module.exports=folderMod