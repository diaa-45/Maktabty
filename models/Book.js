const mongoose = require("mongoose");
const Joi=require("joi");


const bookchema=new mongoose.Schema({
    title: {
        type:"string",
        required: true,
        trim:true,
        minlength:3,
        maxlength:50
    },
    description:{
        type:"string",
        required: true,
        trim:true,
        minlength:5,
        maxlength:50
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"Author"
    }
      
})
const Book = mongoose.model("Book", bookchema);

// Validate create author
function ValidateCreateBook(obj){
    const schema=Joi.object({
        title: Joi.string().trim().max(50).min(3).required(),
        description: Joi.string().trim().max(50).min(5).required(),
        author: Joi.string().trim().max(50).min(3).required(),
    });
    return schema.validate(obj);
}

// Validate update author
function ValidateUpdateBook(obj){
    const schema=Joi.object({
        title: Joi.string().trim().max(50).min(3),
        description: Joi.string().trim().max(50).min(5),
        author: Joi.string().trim().max(50).min(3)
    });
    return schema.validate(obj);
}

module.exports={
    Book,
    ValidateCreateBook,
    ValidateUpdateBook
};