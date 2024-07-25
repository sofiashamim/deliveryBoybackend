const express= require('express');
const app = express();
const port=2000
const connectToDb =require('./db')
connectToDb()
const cors = require('cors')
let Auth= require('./models/Auth')
let authRoutes= require('./routes/authRoute')
let orderRoutes= require('./routes/orderRoutes')
let orderHistoryRoutes= require('./routes/historyRoutes')


app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('welcome')
})


app.use('/api/auth',authRoutes)
app.use('/order',orderRoutes)
app.use('/history',orderHistoryRoutes)


app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})