import mongoose from "mongoose";

let userScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    role : {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
})

let User = mongoose.models.user || mongoose.model("user", userScheme);

export default User;