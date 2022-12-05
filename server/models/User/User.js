const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
        "Please use a valid email.",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],

    //Per StackOverflow: Before you can execute geospatial queries, you need to create a geospatial index:
    // --> db.locationcol.createIndex( { loc : "2dsphere" } )
    // Also, you need to store your locations as valid GeoJSON objects so MongoDB can parse them properly:
    // --> loc : { type: "Point", coordinates: [ -76.703347, 30.710459 ] },

    //Reference:  https://www.mongodb.com/docs/manual/reference/geojson/

    // location: {
    //   type: {
    //     type: String,
    //     enum: ["Point"], // 'location.type' must be 'Point'
    //     required: true,
    //   },
    //   coordinates: {
    //     type: [Number],
    //     required: true,
    //   },
    // },

    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location"
      }
    ],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
