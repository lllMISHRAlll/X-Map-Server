import { Location } from "../models/index.js";

/**
 * Save a new searched Location to the database.
 */
export const saveLocationService = async (userId, address, coordinates) => {
  const location = await Location.create({
    user: userId,
    address,
    coordinates,
  });
  return location;
};

/**
 * Retrieve the Location history for a user.
 */
export const getLocationHistoryService = async (userId) => {
  const history = await Location.find({ user: userId }).sort({ createdAt: -1 });
  return history;
};

/**
 * Delete a specific Location entry for a user.
 */
export const deleteLocationService = async (userId, searchId) => {
  const location = await Location.findOne({ _id: searchId, user: userId });

  if (!location) {
    return null;
  }

  await location.deleteOne();
  return true;
};
