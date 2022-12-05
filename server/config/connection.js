const mongoose = require("mongoose");

console.log(process.env.MONGODB_URI , "mongodb+srv://admin:middleWhere@cluster0.ppbrygo.mongodb.net/?retryWrites=true&w=majority",process.env.MONGODB_URI === "mongodb+srv://admin:middleWhere@cluster0.ppbrygo.mongodb.net/?retryWrites=true&w=majority" );
mongoose.connect(
  process.env.MONGODB_URI||
    "mongodb://127.0.0.1:27017/middleWhere",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
