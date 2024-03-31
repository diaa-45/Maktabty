const mongoose =require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/Library_Apis")
        .then(() => console.log('Connected succesfully ....!'))
        .catch((err) => console.log(err));