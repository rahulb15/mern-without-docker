import mongoose from "mongoose";


//DEfine the schema for the user
const userSchema = new mongoose.Schema({


    key: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    commission: {
        type: Number,
        required: true
    },
    priceAmount: {
        type: Number,
        required: true
    },
    userType: {
        type: String,
    },
    token: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: "Created"
    },
    createdAt: {
        type: Date,
    },
});


//Create the model for the user
const userModel = mongoose.model("user", userSchema);


//Export the model
export default userModel ;