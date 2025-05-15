import Search from "../models/SearchHistory.model.js";

export const saveSearch = async (req, res) => {
  const { address, coordinates } = req.body;
  const search = await Search.create({
    user: req.user.id,
    address,
    coordinates,
  });
  res.status(201).json(search);
};

export const getSearchHistory = async (req, res) => {
  const history = await Search.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(history);
};

export const deleteSearch = async (req, res) => {
  const { id } = req.params;

  const search = await Search.findOne({ _id: id, user: req.user.id });

  if (!search) {
    return res.status(404).json({ message: "Search entry not found" });
  }

  await search.deleteOne();
  res.status(200).json({ message: "Search entry deleted successfully" });
};
