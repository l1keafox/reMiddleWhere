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
  location: {
    type: {
      type: String,
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
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
