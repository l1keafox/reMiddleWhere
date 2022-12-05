const mongoose = require("mongoose");


if(process.env.MONGODB_URI && !process.env.LOCAL_CONNECT ){
  console.log("  -MONGOO>Connecting too : ",process.env.MONGODB_URI);
  mongoose.connect(
    process.env.MONGODB_URI||
      "mongodb://127.0.0.1:27017/middleWhere",
    {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    }
  );
  

} else {
  console.log("  -MONGOO>Connecting too :  mongodb://127.0.0.1:27017/middleWhere");
  mongoose.connect(
      "mongodb://127.0.0.1:27017/middleWhere",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    }
  );
  
}

module.exports = mongoose.connection;
