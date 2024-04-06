const Messages = require("../models/messages");

async function getAll(req, res, next) {
  try {
    const messages = await Messages.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function searchByUserId(req, res, next) {
  try {
    const user_id = req?.query?.user_id;
    console.log(123, user_id);
    const messages = await Messages.find({ user_id: user_id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAll,
  searchByUserId,
};
