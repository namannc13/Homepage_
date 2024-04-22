import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    default: "default"
  },
  user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
});

const linkModel = mongoose.model("Link", linkSchema);

export { linkModel };
//g
