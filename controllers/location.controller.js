import {
  deleteLocationService,
  getLocationHistoryService,
  saveLocationService,
} from "../services/index.js";

/**
 * Controller to handle saving a new search.
 */
export const saveLocation = async (req, res) => {
  const { address, coordinates } = req.body;

  try {
    const search = await saveLocationService(req.user.id, address, coordinates);
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
export const getLocation = async (req, res) => {
  try {
    const history = await getLocationHistoryService(req.user.id);
    res.json(history);
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve search history",
      error: err.message,
    });
  }
};

/**
 * Controller to delete a specific search entry.
 */
export const deleteLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteLocationService(req.user.id, id);

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
