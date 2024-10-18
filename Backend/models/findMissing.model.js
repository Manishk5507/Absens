const { model, Schema } = require("mongoose");

const FindMissingSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, min: 0, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    height: { type: Number, min: 0, default: 0 },
    weight: { type: Number, min: 0, default: 0 },
    hairColor: { type: String, default: "" },
    eyeColor: { type: String, default: "" },
    relationshipWithMissing: { type: String, default: "" },
    lastSeenDate: { type: Date, required: true },
    lastSeenLocation: { type: String, required: true },
    additionalInfo: { type: String, default: "" },
    image: { type: String },
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
