const mongoose = require("mongoose");
const Joi=require("joi");


const userschema=new mongoose.Schema({
    name: {
        type:"string",
        required: true,
        trim:true,
        minlength:3,
        maxlength:50
    },
    nationality:{
        type:"string",
        required: true,
        trim:true,
        minlength:2,
        maxlength:50
    }
      
})
const Author = mongoose.model("Author", userschema);

// Validate create author
function ValidateCreateAuthor(obj){
    const schema=Joi.object({
        name: Joi.string().trim().max(50).min(3).required(),
        nationality: Joi.string().trim().max(50).min(2).required()
    });
    return schema.validate(obj);
}

// Validate update author
function ValidateUpdateAuthor(obj){
    const schema=Joi.object({
        name: Joi.string().trim().max(50).min(3),
        nationality: Joi.string().trim().max(50).min(2)
    });
    return schema.validate(obj);
}

module.exports={
    Author,
    ValidateCreateAuthor,
    ValidateUpdateAuthor
};