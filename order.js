const mongoose=require('mongoose');
    //const {String, Number} = mongoose.Schema.Types;
   /* const orderSchema = mongoose.Schema({
        username:{
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User"
        },
        order : [{
            name: String,
            price: Number,
            quantity: Number
        }]
    },
    { typeKey: '$type'}
    );*/

    const orderSchema = mongoose.Schema({
        email:{
            type:String,
            unique:true,
            required:true
        },
        order : [{
            name: String,
            price: Number,
            quantity: Number
        }],
        total:Number
    })
   

userorder=mongoose.model("userorder",orderSchema);
module.exports=userorder;