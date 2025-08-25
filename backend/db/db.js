import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connectSession = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("MONGODB connected Successfully");
    }
    catch( err ){
        console.log( err ); 
    }
}

export default connectDB;