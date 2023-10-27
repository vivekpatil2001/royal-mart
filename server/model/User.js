import { Schema, model } from "mongoose";

const userschema = new Schema({
    name: {
        type: String,
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true

    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    });

const User = model('User', userschema);

export default User