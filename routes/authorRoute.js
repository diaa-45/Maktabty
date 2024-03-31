const express=require("express");
const router=express.Router();
const asynchandler=require("express-async-handler");
const {Author, ValidateCreateAuthor,ValidateUpdateAuthor}=require("../models/Author");

// Create Author

router.post("/add",asynchandler(
  async(req,res)=>{
    const {error}=ValidateCreateAuthor(req.body);
    if(error)
      return res.status(400).json({message: error.details[0].message});
    const {name,nationality}=req.body;
    const newAuthor = new Author({
        name,
        nationality,
      });
    await newAuthor.save();

    res.status(200).send(newAuthor);
}
));
// Read All Authors

router.get("/",asynchandler(
  async(req,res)=>{
    const authors= await Author.find();

    res.status(200).send(authors);
}
));

// Read Author by ID
router.get('/:id' ,asynchandler(
  async(req,res)=>{
      const author= await Author.findById(req.params.id);
      if(author)
         res.status(200).send(author);
      else
         res.status(404).send("Author is not found");
     }
));

// Update Author

router.put("/edit/:id",asynchandler(
  async(req,res)=>{
    const {error}=ValidateUpdateAuthor(req.body);
    if(error)
      return res.status(400).json({message: error.details[0].message});
   
      const newAuthor= await Author.findByIdAndUpdate(req.params.id,{
          name:req.body.name,
          nationality: req.body.nationality
      }, {new: true});

    res.status(200).send(newAuthor);
}
));

module.exports=router;