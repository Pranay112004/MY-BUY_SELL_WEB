import mongoose  from "mongoose";

export const connectdb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error){
        console.error(`Error:${error.message}`);
        process.exit(1); // processs code 1 code means exit with failure , but 0 means success
    }

}