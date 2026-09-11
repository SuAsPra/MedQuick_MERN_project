const mongoose=require("mongoose")
const {Schema}=mongoose

const productSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:"Brand",
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    requiresPrescription:{
        type:Boolean,
        default:false
    },
    manufacturer:{
        type:String
    },
    expiryDate:{
        type:Date
    },
    dosage:{
        type:String
    },
    medicineType:{
        type:String
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Product',productSchema)