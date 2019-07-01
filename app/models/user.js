const mongogse = require('mongoose'),Schema = mongogse.Schema,
  userSchema = new Schema({
    id:{
      type:String,
      unique:true,
      require:true
    },
    userName:{
      type:String,
      require: true
    },
    userPwd:{
      type:String,
      require:true
    },
    userPhone:{
      type:Number,
      require:true
    }
  });


module.exports = mongogse.model('user',userSchema);