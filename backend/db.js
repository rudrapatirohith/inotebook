
const mongoose=require('mongoose');
const mongoURI= "mongodb://localhost:27017/user";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to MongoDB")
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = connectToMongo;