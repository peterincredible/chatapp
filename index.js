let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = module.exports.io = require("socket.io").listen(server);
let bodyparser = require("body-parser");
let userRouter = require("./routers/user");
let cors = require('cors');
let mongoose = require("mongoose");
let myevent = require("./server_helpers/event");
let Chat = require("./models/chat");
let User = require("./models/user");
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
require("dotenv").config();//this is wherre all the secret data not to be shared will be 
let privatesocket = {};//this would hold every new user socket for private messaging;
istyping ={}//for typing... notification
let online =[];//this will hold every user that is online
let allusers;// this will hold every user that went offline or logout
app.use("/api",userRouter);

app.get("/",async(req,res)=>{
   console.log("it worked");
})

    //fired when a new user Make a connection 
io.on(myevent.connection, async (socket)=>{
     //event fired when user login 
    socket.on(myevent.login,async (username,ack)=>{
        //add a username property to the socket in case user logs out or disconnect
        //add the socket to the privatesocket object with the username as key
        //add username of the connected user to the istyping object for typing notification
        //checkif user is online b4 emitting to all connected sockets if it is not push it to online array and still emit it
        let chat = await Chat.find({});
        socket.username = username;
        privatesocket[username] = socket;
        istyping[username] = false;
        allusers = await User.find({});
        allusers = allusers.map(data=>data.username);
       
            ack(chat)
        if(online.includes(username)){
            io.sockets.emit("online now",{online,istyping,allusers});
            return
        }
           online.push(username);
           io.sockets.emit("online now",{online,istyping,allusers});
    })
    //event fired when user disconnects
    socket.on(myevent.disconnect,async ()=>{
        //find all the users from the database and get all the users name
        //remove the username from the online array variable and delete it from privateSocket of the user and also typing object
        //send the updated online,istyping and allusers to still connected users
        allusers = await User.find({});
        allusers = allusers.map(data=>data.username)
        let index = online.indexOf(socket.username);
        delete privatesocket[socket.username];
        delete istyping[socket.username]
        online.splice(index,1);
           //socket.broadcast.emit("new message",{from:"community",message:`${socket.username} just left`,chatroom:"community"});
           io.sockets.emit("online now",{online,allusers,istyping});
    
       })
    //event fired when a user send a new message
    socket.on(myevent.send_message, async (data)=>{
            //save the message to the database then send it 
            let new_message = new Chat(data);
              await new_message.save();
              //if the message is sent to the community group then send to community group
           if(data.to == "community"){
               
                return io.emit(myevent.new_message,new_message);
           }
           // check if the reciever is online if yes send to the reciever else send back to sender 
           if(privatesocket[data.to]){
            privatesocket[data.to].emit(myevent.new_message,new_message);
           }
           socket.emit(myevent.new_message,new_message);
       
});
socket.on(myevent.typing,(data)=>{
    //check if user is reciever is online before sending typing event notification
    if(data.to != "community" && privatesocket[data.to]){
    privatesocket[data.to].emit("user typing",data);
    }

});
socket.on(myevent.end_typing,(data)=>{
        //check if  reciever is online before sending end typing event notification
     if(data.to != "community" && privatesocket[data.to]){
        privatesocket[data.to].emit("user end typing",data);
     }

})
socket.on("read",async (id)=>{
    let data = await Chat.findByIdAndUpdate(id,{status:"read"},{new: true});
    socket.emit("read_sucessfull",data);

})
socket.on("read_community",async (id)=>{
    let data = await Chat.findById(id);
      data.group_read.push(socket.username)
      await data.save();
    socket.emit("read_sucessfull",data);
})


})//end of the io event and socket connection life Cycle function


let port = process.env.PORT || process.env.MYPORT;
mongoose.connect('mongodb://localhost/main_chat');
mongoose.connection.once("open",()=>{
    console.log("the database is opennn and working perfectly");
})

server.listen(port,()=>{
    console.log(" SSS server listeining to port 4000");
}) 