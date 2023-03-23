const { Schema, model } = require("mongoose");

// Schema to create user model 
const userSchema = new Schema(
  {
    userName: {
      type: String,
      uniqued: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      uniqued: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please use a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: true,
  }
);

//In mongoose, virtual properties are properties that are not persisted to the database but can be accessed like a regular property of a document. They are computed on-the-fly using custom getter and setter functions.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);
module.exports = User;
