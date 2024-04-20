import mongoose, { mongo } from "mongoose";


const UserSchema = new mongoose.Schema({
    username: 
    {
        type: String,
        required: true,
        unique: true
    },
    name: 
    {
        type: String,
        default: ""
    },
    profileUrl: 
    {
        type: String,
        required: true
    },
    avatarUrl: 
    {
        type: String,
    },
    likeProfiles: 
    {
        type: [String],
        default: []
    },
    likedBy: 
    [
        {
            username: {
                type: String,
                required: true
            },
            avatarUrl: {
                type: String,
            },
            likedDate: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

export default User