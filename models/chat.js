let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let tempschema = new Schema({
   chatroom:{
       type:String,
       required:true
   },
   from:{
       type:String,
       required:true
   },
   to:{
       type:String
   },
  status:{
      type:String,
      default:"unread",
  },
  message:{
      type:String
  },
  group_read:[String]
}
)

let chatschema = mongoose.model("chat",tempschema);
module.exports = chatschema;