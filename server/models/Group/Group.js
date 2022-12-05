const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  
  // description: {
  //   type: String,
  //   required: false,
  // },
  // password: {
  //   type: String,
  //   // data currently does not seed unless password provided
  //   required: false,
  //   minlength: 5,
  // },
  centerLatitude: {
    type: Number,
  },
  centerLongitude: {
    type: Number,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  //will contain objectId's of the locations the user's set for the group -- one location per user
  userLocations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
  ],
});

// groupSchema.pre("save", async function (next) {
//   if (this.isNew || this.isModified("password")) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

groupSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Group = model("Group", groupSchema);

module.exports = Group;
