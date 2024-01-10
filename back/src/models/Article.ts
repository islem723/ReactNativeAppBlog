import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Article",
  new Schema(
    {
      content: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      topic: {
        type: String,
        required: true,
      },
      tags: {
        type: [String],
        required: false,
      },
      image: {
        type: String,
        required: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  )
);
