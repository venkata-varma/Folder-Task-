const mongoose=require('mongoose')
 
async function connectDB(){
    try{
await mongoose.connect(process.env.db,{
    useNewUrlParser:true
})
console.log('DB is up')
    }
    catch(err){
        console.log(err.message)
    }
}
module.exports=connectDB