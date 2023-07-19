const express=require('express')
const app=express()
app.use(express.json())
const mongoose=require('mongoose')
mongoose.set('strictQuery', true)

const error=require('./middleware/error')
const connectDB=require('./dbConnect.js')
const dotenv=require('dotenv')
const jwt=require('jsonwebtoken')

dotenv.config()
const cookieparser=require('cookie-parser')
app.use(cookieparser())
connectDB()
const ums=require('./models/user')
const tms=require('./models/task')
const taskRoute=require('./routes/taskRoute')
const userRoute=require('./routes/userRoute')


const folderRoute=require('./routes/folderRoute')
app.use(folderRoute)
app.use(userRoute)
app.use(taskRoute)
app.use(error)

app.get('/', (req,res)=>{
    res.send('HILLo')
})

app.listen(1001,()=>{
    console.log('Server is up' )
})