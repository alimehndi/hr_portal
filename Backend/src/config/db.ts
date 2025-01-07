import {connect} from "mongoose";

const connectDB = async ()=> {

    try {
         const connection = await connect(process.env.MONGO_DB_URI as string);
         if(connection)
         {
            console.log(`Connected successfully to : ${process.env.MONGO_DB_URI as string}`);
         }
    } catch (error) {
        console.log(`Error : ${error}`)
        process.exit(1);
    }
}
export default connectDB;