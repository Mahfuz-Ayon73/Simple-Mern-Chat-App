import mongoose from "mongoose";

const connectToMongoDB = async () => {
   try {
     await mongoose.connect(process.env.MONGODB_URI)
     console.log('connected to mongodb database')
   } catch (error) {
     console.log('error connecting to db' , error);
     
   }
}

export default connectToMongoDB