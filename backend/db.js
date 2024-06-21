
import mongoose from 'mongoose'; //importing mongo 
const mongoURI= "mongodb+srv://rohithrudrapati:rohithrudrapati@inotebook.byqgit3.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Inotebook"; //connecting mongo db 
// const mongoURI = "mongodb://localhost:27017"

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

// module.exports = connectToMongo;//exports the function so that we can you in diff files
export default connectToMongo;