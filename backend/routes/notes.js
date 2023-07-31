const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Users = require('../models/notes');
const Notes = require('../models/notes');
//Route1
//login
// Created Notes
router.post('/addnotes',fetchUser,[body('title').exists(),body('description').exists()],async(req,res)=>{

      //validation check of reqbody =>
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          // Handle validation errors
          return res.status(400).json({ errors: errors.array() });
      }

      try{
             const {title,description,tag} = req.body;
             const notes = await Notes.create({
                title:title,
                description:description,
                tag:tag,
                user:req.user.id
             });

             return res.send(notes)
      }
      catch(err){
          console.log('Error in created Notes => ',err)
      }

})

//Notes 1
router.get('/getnotes',fetchUser,async(req,res)=>{

    try {
        const usertId = req.user.id
        console.log(usertId);
        const notes =await Notes.find({user:usertId});
        return res.send(notes);        
    } catch (error) {
        console.log('Error in get Notes => ',err)
        
    }
})

//Routes 3

router.put('/update/:id',fetchUser,async(req,res)=>{

    const {title,description,tag} = req.body;
    const newNotes ={};
    if(title){newNotes.title=title};
    if(description){newNotes.description=description};
    if(tag){newNotes.tag=tag};

    const loginUser =req.user.id;
    const noteId= req.params.id;

    try{
        const findNote = await Notes.findById(noteId);
        if(!findNote){
            return res.status(401).json('Hi Sir Note Valis Id');
        }
        const getUserId = findNote.user;
        console.log('GetUser => ',getUserId);
        console.log('Login User=> ',loginUser);
        if(getUserId!=loginUser){
            return res.status(404).json('Not Allowed x x x'); 
        }
        const updateNote =await Notes.findByIdAndUpdate(findNote.id,newNotes);
        return res.send(updateNote); 
    }
    catch(err){
        console.log('Error in upader x x');
    }

})




router.delete('/deletenote/:id',fetchUser,async(req,res)=>{



    const loginUser =req.user.id;
    const noteId= req.params.id;

    try{
        const findNote = await Notes.findById(noteId);
        if(!findNote){
            return res.status(401).json('Hi Sir Note Valis Id');
        }
        const getUserId = findNote.user;
        console.log('GetUser => ',getUserId);
        console.log('Login User=> ',loginUser);
        if(getUserId!=loginUser){
            return res.status(404).json('Not Allowed x x x'); 
        }
        const updateNote =await Notes.findByIdAndDelete(findNote.id);
        return res.send(updateNote); 
    }
    catch(err){
        console.log('Error in upader x x');
    }

})


module.exports =router;