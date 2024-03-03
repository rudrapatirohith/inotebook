const connectToMongo= require('./db');
const express= require('express')
connectToMongo();


const app=express()
const port=3000

//to use req.body we use this middle ware
app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port,()=>{
    console.log(`Server Started Listening on port ${port}`)
})
