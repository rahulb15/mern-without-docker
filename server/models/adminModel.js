import mongoose from "mongoose";


//DEfine the schema for the admin
const adminSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    share: {
        type: Number,
        required: true
    },
    myShare: {
        type: Number,
    },
    commission: {
        type: Number,
        required: true
    },
    priceAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Create the model for the admin
const adminModel = mongoose.model("admin", adminSchema);

//Export the model
export default adminModel ;

