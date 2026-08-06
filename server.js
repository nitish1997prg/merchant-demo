import "./telemetry.js";
import "./config/env.js";
import { connectDb } from "./config/db.js";
import { app } from "./app.js";

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

async function startServer(){
    try{
        //Connect to MongoDB
        await connectDb(MONGO_URI);

        //Start App
        app.listen(PORT,()=>{
            console.log(`Merchant server listening on PORT ${PORT}`);
        });


    }catch(error){
        console.error("Error starting the merchant server!",error);
        process.exit(1);
    }
}

await startServer();