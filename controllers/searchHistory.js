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
