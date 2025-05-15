import {
  deleteLocationService,
  getLocationHistoryService,
  saveLocationService,
} from "../services/index.js";

import logger from "../config/logger.js";

/**
 * Controller to handle saving a new search.
 */
export const saveLocation = async (req, res) => {
  const { address, coordinates } = req.body;

  try {
    const search = await saveLocationService(req.user.id, address, coordinates);
    logger.info(`Location saved for user ${req.user.id}: ${address}`);
    res.status(201).json(search);
  } catch (err) {
    logger.error(
      `Failed to save location for user ${req.user.id}: ${err.message}`
    );
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
    logger.info(`Retrieved location history for user ${req.user.id}`);
    res.json(history);
  } catch (err) {
    logger.error(
      `Failed to retrieve location history for user ${req.user.id}: ${err.message}`
    );
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
      logger.warn(
        `Delete failed: search entry ${id} not found for user ${req.user.id}`
      );
      return res.status(404).json({ message: "Search entry not found" });
    }

    logger.info(`Deleted search entry ${id} for user ${req.user.id}`);
    res.status(200).json({ message: "Search entry deleted successfully" });
  } catch (err) {
    logger.error(
      `Failed to delete search entry ${id} for user ${req.user.id}: ${err.message}`
    );
    res
      .status(500)
      .json({ message: "Failed to delete search entry", error: err.message });
  }
};
