const mongoose=require("mongoose")

const PinShema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:20,
    },
    desc:{
        type:String,
        max:50,
        required: true,
    },
    title:{
        type:String,
        max:100,
        required: true,
    },
    date:{
        type:String,
        max:130,
        required: true,
    },
    lat:{
        type:Number,
        required: true,
        
    },
    long:{
        type:Number,
        required: true,
        
    },
    isPrivate:{
        type:Boolean,
        default:false
    }   
    },
{timestamps:true}
)


module.exports=mongoose.model("Pin", PinShema);