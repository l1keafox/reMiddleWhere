const mongoose = require("mongoose");


if(process.env.MONGODB_URI && !process.env.LOCAL_CONNECT ){
  console.log("  -MONGOO>Connecting too :  ENV",process.env.MONGODB_URI);
  mongoose.connect(
    process.env.MONGODB_URI||
      "mongodb://root:example@192.168.0.15:27017/?authSource=admin",
    {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    }
  );
  

} else {
  console.log("  -MONGOO>Connecting too : Lacking ENV mongodb://root:example@raspberrypi.local:27017/middleWhere");
  mongoose.connect(
      "mongodb://root:example@raspberrypi.local:27017/?authSource=admin",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    }
  );
  
}

module.exports = mongoose.connection;
