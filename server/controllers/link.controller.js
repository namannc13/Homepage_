import { linkModel } from "../models/link.model.js";
import { userModel } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

const getLinks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const links = await linkModel.find({ user: userId });
    res.status(200).json(links);
  } catch (error) {
    next(error);
  }
};

const addLink = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, username, tag, url, iconName } = req.body;
    const name_ = await linkModel.findOne({ name });
    if (name_)
      return next(errorHandler(403, "A Link with this name already exists"));
    const newLink = new linkModel({
      name,
      username,
      tag,
      url,
      user: userId,
      iconName,
    });
    await newLink.save();
    res.status(200).json(newLink);
  } catch (error) {
    next(error);
  }
};

const deleteLink = async (req, res, next) => {
  const {name} = req.body;
  const link = await linkModel.findOne({ name });
  if (!link) return next(errorHandler(404, "link not found!"));
  if (req.user.id !== link.user.toString()) {
    return next(errorHandler(401, "You can only delete your own links!"));
  }
  try {
    await linkModel.findOneAndDelete({ name });
    res.status(200).json("Link has been deleted!");
  } catch (error) {
    next(error);
  }
};

export { getLinks, addLink, deleteLink };
