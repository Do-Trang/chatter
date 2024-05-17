const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, "User id by MySQL"],
    },
    // user_name: {
    //   type: String,
    //   required: [true, "User name by MySQL"],
    // },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

messagesSchema.index({ user_id: 1 });

const Messages = mongoose.model("Messages", messagesSchema);
module.exports = Messages;
