import mongoose from "mongoose";

const user_info_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});



const User_info = new mongoose.model('user_info', user_info_schema)
export {User_info};