import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Note from "./models/Notes.js";


dotenv.config();

const app  = express();

app.post("/notes",async(req,res)=>{
   try{

    const {note} = req.query;

    const newNote = await Note.create({
        note: note,
    });

    res.status(201).json(newNote);

   }catch(error){
      res.status(500).json({error: "Failed to create note"});
   }
})



mongoose.connect(process.env.MONGO_URI)
.then(async ()=>{
     console.log("Connected to MongoDB");

       app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
})
 .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
