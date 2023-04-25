const mongoose=require("mongoose")

const UserShema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password: {
        type:String,
        required:true,
        min:7
    },
    profilePicture:{
        type: String,
        default:""
    },
    coverPicture:{
        type: String,
        default:""
    },
    followers:{
        type: Array,
        default:[]
    },
    followings:{
        type: Array,
        default:[]
    },
    friendlist:{
        type: Array,
        default:[]
    },
    desc:{
        type:String,
        max:50,
    },
    city:{
        type:String,
        max:50
    },
    bodyheight:{
        type:String,
        max:3
    },
    bodyweight:{
        type:String,
        max:3
    },
    position:{
        type:String,
        max:15
    },
    yearsOld:{
        type:String,
        max:15
    }
    },
{timestamps:true}
)


module.exports=mongoose.model("User", UserShema);