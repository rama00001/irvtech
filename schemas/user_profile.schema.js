import mongoose from "mongoose";

const user_profile_schema = new mongoose.Schema({
    first_name:{
        type: String
    },
    last_name:{
        type: String
    },
    user_id:{
        type: String
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
});



const User_profile = new mongoose.model('user_profiles', user_profile_schema)
export {User_profile};