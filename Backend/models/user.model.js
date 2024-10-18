const { model, Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true }, 
    email: { type: String, required: true, unique: true },  
    address: { type: String, default: "" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    country: { type: String, default: "" },
    streetAddress: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    postalCode: { type: String, default: "" },
    notification: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Plugin passport-local-mongoose to handle password hashing
UserSchema.plugin(passportLocalMongoose);

module.exports = model("User", UserSchema);
