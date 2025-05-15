import logger from "../config/logger.js";

export function requestLogger(req, res, next) {
  logger.info(`${req.method} ${req.url}`);
  next();
}
