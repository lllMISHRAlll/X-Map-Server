import {
  saveSearchService,
  getSearchHistoryService,
  deleteSearchService,
} from "../services/searchService.js";

/**
 * Controller to handle saving a new search.
 */
export const saveSearch = async (req, res) => {
  const { address, coordinates } = req.body;

  try {
    const search = await saveSearchService(req.user.id, address, coordinates);
    res.status(201).json(search);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save search", error: err.message });
  }
};

/**
 * Controller to retrieve the user's search history.
 */
export const getSearchHistory = async (req, res) => {
  try {
    const history = await getSearchHistoryService(req.user.id);
    res.json(history);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to retrieve search history",
        error: err.message,
      });
  }
};

/**
 * Controller to delete a specific search entry.
 */
export const deleteSearch = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteSearchService(req.user.id, id);

    if (!result) {
      return res.status(404).json({ message: "Search entry not found" });
    }

    res.status(200).json({ message: "Search entry deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete search entry", error: err.message });
  }
};
