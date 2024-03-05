
const mongoose=require('mongoose'); //importing mongo 
const mongoURI= "mongodb://localhost:27017/inotebook"; //connecting mongo db 


//waits till it connect and print connected if not prints the error
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI) 
        console.log("Connected to MongoDB")
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = connectToMongo;//exports the function so that we can you in diff files