//this is the function that will get all offline users
let Users = require("../models/user");
module.exports = async(online)=>{
    offline =[];
//get all registered users;
let allusers = await Users.find({});
//get all registered users currently online
   for(let i of Users){
          let checker = false;
          for(let j of online){
                if(i.username == j){
                    checker = true//means that user is online
                }
          }
          if(checker == false){
                offline.push(i.username);
          }
   }

   return offline;

//parse it to the registered users then anyone that is not in the online users will be in offline users
}
