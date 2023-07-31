const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

JWT_Shash = 'BhaveshPhareisagoodboy';

//ROUTES 1
//do not req login
//http://localhost:7000/api/auth/create-user
router.post('/create-user', [body('email').isEmail(), body('name').isLength({ min: 1 }), body('password').isLength({ min: 1 })],
    async (req, res) => {

        //validation check of reqbody =>
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Handle validation errors
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            //find user email
            const findUser = await Users.findOne({ email : req.body.email });
            if (findUser) {
                return res.status(400).json('User is Exist change Email Id');
            }
            //get salt promise
            const salt = await bcrypt.genSalt(10);
            const SecurePassword = await bcrypt.hash(req.body.password, salt);

            //create user
            const user = await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: SecurePassword
            })
            console.log('Hi Bhavesh Sir User is Created SuccessFully....\nuser data =>\n', user)

            const data = {
                user: {
                    id: user.id
                }
            }
            //token generation data =>payload,Shash,expiretime add
            const authtoken = jwt.sign(data, JWT_Shash)

            return res.json({ authtoken });

            //    {
            //     "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ZmU5NDVhNzMwMTYxMTg5MmNkNGFhIn0sImlhdCI6MTY4NzE1Mjk2NX0.wb5zgUxihqXgccvmi6v82BjjeHdiVl2sNXSTZWzDxUc"
            //   }
        }
        catch (err) {
            console.log("error in created User x x x", err);
        }

    })


//ROUTES 2
//Login
//http://localhost:7000/api/auth/login
router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 1 })],
    async (req, res) => {

        //validation check of reqbody =>
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Handle validation errors
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            //find valid Email
            const { email, password } = req.body;
            const findUser = await Users.findOne({  email })
            //find valid user by email
            if (!findUser) {
                return res.status(400).json('Hi Sir Chagnge ur Credential');
            }
            //compared password
            const passwordCompared =await bcrypt.compare(password,findUser.password);
            // password not match
            if(!passwordCompared){
                return res.status(400).json('Hi Sir Chagnge ur Credential');
            }
            //send payload
            const data = {
                user: {
                    id: findUser.id
                }
            }
            //token generation data =>payload,Shash,expiretime add
            const authtoken = jwt.sign(data, JWT_Shash)
            console.log('authtoken => ',authtoken);
            console.log('for data => ',data);
            return res.json({ authtoken });

            // {
            //     "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ZmU5NDVhNzMwMTYxMTg5MmNkNGFhIn0sImlhdCI6MTY4NzE1NDE5Nn0.LnvAdjESQqM07XcmAZJtUrGjhUFvcCHQIqgXfbfh4lg"
            //   }
        }
        catch (err) {
            console.log("error in login User x x x", err);
        }
    }
);


//Routes3
//login
//getuser
router.get('/getuser',fetchUser,async(req,res)=>{
     
   try {
    const userId = req.user.id;
    const findUser=await Users.findById(userId).select('-password');
    if (!findUser) {
        return res.status(400).json('Hi Sir in getUser Chagnge ur Credential');
    }
    res.send(findUser);
    
   } catch (error) {
    console.log("error in login User x x x", err);
   }
})


module.exports = router;