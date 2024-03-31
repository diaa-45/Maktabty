const express=require("express");
const router=express.Router();
const asynchandler=require("express-async-handler");
const {Book, ValidateCreateBook,ValidateUpdateBook}=require("../models/Book");

// Create Book

router.post("/add",asynchandler(
  async(req,res)=>{
    const {error}=ValidateCreateBook(req.body);
    if(error)
      return res.status(400).json({message: error.details[0].message});
    
    const book = new Book({
        title:req.body.title,
        description:req.body.description,
        author:req.body.author
      });
    await book.save();

    res.status(200).send(book);
}
));
// Read All Books

router.get("/",asynchandler(
  async(req,res)=>{
    const books= await Book.find().populate("author");

    res.status(200).send(books);
}
));

// Read Book by ID
router.get('/:id' ,asynchandler(
  async(req,res)=>{
      const book= await Book.findById(req.params.id).populate("author");
      if(book)
         res.status(200).send(book);
      else
         res.status(404).send("Book is not found");
     }
));

// Update Book

router.put("/edit/:id",asynchandler(
  async(req,res)=>{
    const {error}=ValidateUpdateBook(req.body);
    if(error)
      return res.status(400).json({message: error.details[0].message});
   
      const book= await Book.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        description:req.body.description,
        author:req.body.author
      }, {new: true});

    res.status(200).send(book);
}
));

module.exports=router;