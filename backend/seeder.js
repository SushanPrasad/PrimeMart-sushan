import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


import colors from "colors";
import users from "../backend/data/users.js";
import products from "../backend/data/products.js";
import User from "../backend/models/userModel.js";
import Product from "../backend/models/productModel.js";
import Order from "../backend/models/orderModel.js";
import db from "../backend/config/db.js";

db();

const importData = async () =>{
    try{
 await Order.deleteMany();
 await Product.deleteMany();
 await User.deleteMany();

const createdUsers = await User.insertMany(users);
const adminUser = createdUsers[0]._id;

const sampleProducts = products.map((product) => {
    return { ...product, user: adminUser};
});

await Product.insertMany (sampleProducts);
console.log("Data Imported:".green.inverse );
process.exit();

    }catch(error){
        console.log(`${error}`.red.inverse );
        process.exit(1);
    }
}

//////////////above input stuffs for user aceess data with seeeding process


const destroyData = async() => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        
        console.log("Data Destroyed:".red.inverse );
        process.exit();
    }
   
    catch (error) {
        console.log(`${error}`.red.inverse );
        process.exit(1);
    }
       
};

if (process.argv[2] === '-d'){
    destroyData()
}
else{
    importData()
}


//mongodb