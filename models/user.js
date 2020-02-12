let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let tempschema = new Schema({
   username:{
       type:String,
       required:true
   },
   password:{
       type:String,
       required:true
   },
   email:{
       type:String
   },
   name:String,
   surname:String
}
)

let userschema = mongoose.model("user",tempschema);
module.exports = userschema;
