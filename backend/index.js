const connectToMongo= require('./db'); //calling db.js file
const express= require('express') //intializing express librbary
connectToMongo(); //calling the db.js


const app=express() //creating a variable to use exoress
const port=5000 //giving a port number to work on

//to use req.body we use this middle ware
app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

//start a server that listens on a specific port, and then logs a message indicating the server is ready to accept connections on that port.
app.listen(port,()=>{
    console.log(`Server Started Listening on port ${port}`)
})
