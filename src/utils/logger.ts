// Set to true to enable logs, false to disable logs
const isLogsEnabled = process.env.LOGS_ENABLED ?? false;
console.info(`Logs enabled: ${isLogsEnabled}`);

export const logger = {
  log: (...args: unknown[]): void => {
    if (isLogsEnabled) {
      console.log(...args);
    }
  }
};