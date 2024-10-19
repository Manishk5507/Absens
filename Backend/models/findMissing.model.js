const { model, Schema } = require("mongoose");

const FindMissingSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, min: 0, required: true },
    gender: { type: String, enum: ["male", "female", "other","Male","Female","Other","MALE","FEMALE","OTHER"], required: true },
    height: { type: String, default: "" },
    weight: { type: String, default: "" },
    hairColor: { type: String, default: "" },
    eyeColor: { type: String, default: "" },
    relationshipWithMissing: { type: String, default: "" },
    lastSeenDate: { type: Date, required: true },
    lastSeenLocation: { type: String, required: true },
    additionalInfo: { type: String, default: "" },
    image: { type: String,default:"" },
    // images:{
    //   urls:{type:Array,default:[{
    //     type:String,
    //     default:""
    //   }]},
    //   embeddings: { type: Array, default:[] }
    // },
    status: {
      type: String,
      enum: ["Pending", "Resolved", "Closed"],
      default: "Pending",
    },
    // user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("FindMissing", FindMissingSchema);
