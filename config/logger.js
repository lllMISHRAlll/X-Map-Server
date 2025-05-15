import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/combined.log",
      silent: process.env.VERCEL === "1",
    }),
  ],
});

export default logger;
