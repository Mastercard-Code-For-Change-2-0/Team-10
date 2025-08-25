import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    numberOfItems : {
        type: Number,
        required: true
    },
    organisationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation',
        required: true
    }
});

const orgSchema = new mongoose.Schema({
    organisationName : {
        type : String,
        required : true
    },
    email : {
        type : String, 
        required : true,
        unique : false
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["admin", "donor","reciever"],
        default : "donor"
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    image : {
        type : String
    },
    listings: [listingSchema]
});

const Organisation = mongoose.model("Organisation", orgSchema);
export default Organisation;