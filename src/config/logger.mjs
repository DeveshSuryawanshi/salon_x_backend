import { createLogger, format, transports, addColors } from 'winston';
import path from 'path';
import fs from 'fs';

const customLevels = {
    levels: {
      fatal: 0,   // Highest priority
      error: 1,
      warn: 2,
      info: 3,
      http: 4,
      debug: 5,   // Lowest priority
    },
    colors: {
      fatal: 'red',
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'cyan',
      debug: 'blue',
    },
  };

// Ensure the logs directory exists
const logsDir = path.resolve('logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Log file path
const logFilePath = path.join(logsDir, 'application.log');

// Add the custom colors to Winston
addColors(customLevels.colors);

// Create a Winston logger
const Logger = createLogger({
    levels: customLevels.levels,
    level: 'info', // Minimum level to log
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Ensure timestamp format
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`; // Print with timestamp and level
      })
    ),
    transports: [
      // Console transport with colorize for color output
      new transports.Console({
        level: 'debug', // Show all levels from debug to fatal
        format: format.combine(
        //   format.colorize({ all: true}), // Apply colorization only in the console
          format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`; // Format log message
          })
        ),
      }),
      // File transport for logging to file
      new transports.File({
        filename: logFilePath,
        level: 'info', // Log only info and higher levels to file
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Timestamp format
          format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`; // Plain log message for file
          })
        ),
      }),
    ],
});

// Middleware for logging HTTP requests
const requestLoggerMiddleware = (req, res, next) => {
  const { method, url } = req;
  const startTime = new Date();

  res.on('finish', () => {
    const { statusCode } = res;
    const responseTime = new Date() - startTime;
    Logger.info(`[${method}] ${url} ${statusCode} - ${responseTime}ms`);
  });

  next();
};

// Usage
// Logger.fatal('This is a fatal log'); // Highest priority
// Logger.error('This is an error log');
// Logger.warn('This is a warning log');
// Logger.info('This is an info log');
// Logger.http('This is an HTTP log');
// Logger.debug('This is a debug log'); // Lowest priority

export { Logger, requestLoggerMiddleware };
