import mongoose from "mongoose";

const connectDB = async(DATABASE_URL)=>{
    try {
        const DB_OPTIONS = {
            dbName:"adminDB",
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;