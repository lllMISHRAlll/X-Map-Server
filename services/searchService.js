import Search from "../models/SearchHistory.model.js";

/**
 * Save a new search to the database.
 */
export const saveSearchService = async (userId, address, coordinates) => {
  const search = await Search.create({
    user: userId,
    address,
    coordinates,
  });
  return search;
};

/**
 * Retrieve the search history for a user.
 */
export const getSearchHistoryService = async (userId) => {
  const history = await Search.find({ user: userId }).sort({ createdAt: -1 });
  return history;
};

/**
 * Delete a specific search entry for a user.
 */
export const deleteSearchService = async (userId, searchId) => {
  const search = await Search.findOne({ _id: searchId, user: userId });

  if (!search) {
    return null;
  }

  await search.deleteOne();
  return true;
};
