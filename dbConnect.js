const mongoose=require('mongoose')
const db='mongodb+srv://venkats9:weather9@cluster0.9ftgfg0.mongodb.net/Fwhy3?retryWrites=true&w=majority'
async function connectDB(){
    try{
await mongoose.connect(db,{
    useNewUrlParser:true
})
console.log('DB is up')
    }
    catch(err){
        console.log(err.message)
    }
}
module.exports=connectDB