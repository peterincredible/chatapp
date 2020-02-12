let User = require("../models/user");
let Chats = require("../models/chat");
let router = require("express").Router();
let bcrypt = require('bcryptjs');
let jwt = require("jsonwebtoken");
//this check if the username is already in the account if not it create an a new user account
router.post("/signup",async (req,res)=>{
    try{
          // find if their is any account with that username already 
          let user = await User.findOne({username:req.body.username});
        //test if there is any user send an error if there is and if  none create new account
        if(user){
          return  res.status(401).send({message:"username already taken"})
        }
        let newuser = new User(req.body);
        let salt = bcrypt.genSaltSync(10);//create a salt to encrypt the password
        newuser.password = bcrypt.hashSync(newuser.password,salt);//create a hash so that the password will not be in clear text;
        await newuser.save();//save the new user
        var {username,_id,name,surname,email} = newuser;
        let data = jwt.sign({username,_id,name,surname,email},process.env.SECRET);
        return res.send({user:data})//send response back to client
    }catch(err){
        //if there is any error from the database at all send this
        res.status(401).send({message:"there is an error in creating user"});

    }


})//

router.post("/signin",async (req,res)=>{
    try{
        //find the user
        let user = await User.findOne({username:req.body.username});
        //if the user is present 
        if(user){    
        //check if the passwords match and if not throw an error
           if( bcrypt.compareSync(req.body.password,user.password))
                var {username,_id,name,surname,email} = user;
                let data = jwt.sign({username,_id,name,surname,email},process.env.SECRET);
                return res.send({user:data})//send response back to client
            }

            res.status(401).send({message:"password not correct"})

    }catch(err){
        //if any other errors do this
           res.status(401).send({message:"there is an error of your data at the database"});
    }

});


module.exports = router;