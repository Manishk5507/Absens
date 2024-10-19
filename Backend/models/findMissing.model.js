const { model, Schema } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const FindMissingSchema = new Schema(
  {
    unique_id: { type: String, default: uuidv4 },
    name: { type: String, default: "" },
    age: { type: Number, default: 0 },
    gender: {
      type: String,
      enum: [
        "male",
        "female",
        "other",
        "Male",
        "Female",
        "Other",
        "MALE",
        "FEMALE",
        "OTHER",
      ],
      required: true,
    },
    height: { type: String, default: "" },
    weight: { type: String, default: "" },
    hairColor: { type: String, default: "" },
    eyeColor: { type: String, default: "" },
    relationshipWithMissing: { type: String, default: "" },
    lastSeenDate: { type: Date, required: true },
    lastSeenLocation: { type: String, required: true },
    additionalInfo: { type: String, default: "" },
    images: {
      urls: [
        {
          type: String,
          default: "", // This is fine; you can leave it as is.
        },
      ],
      embeddings: {
        type: Array,
        default: [],
      },
    },
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
