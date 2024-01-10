import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "UserBookmarks",
  new Schema(
    {
      User: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      Article: {
        type: Schema.Types.ObjectId,
        ref: "Article",
      },
    },

    {
      timestamps: true,
    }
  )
);
