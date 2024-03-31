require("./models/DBconnect");
const express=require("express");
const authorRoute=require("./routes/authorRoute");
const bookRoute=require("./routes/bookRoute");
const app =express();

const port=process.env.PORT||7000;

app.use(express.json());

app.use("/author",authorRoute);
app.use("/book",bookRoute);





app.listen(port,()=>{
    console.log(`listinig on port : ${port} ....`);
});