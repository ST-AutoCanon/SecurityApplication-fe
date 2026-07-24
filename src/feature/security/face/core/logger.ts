import { getConfig } from "./config";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

type LogData = unknown;

class Logger {
  private get enabled(): boolean {
    return getConfig().debug;
  }

  private timestamp(): string {
    return new Date().toISOString();
  }

  private format(level: LogLevel, message: string) {
    return `[${this.timestamp()}] [${level}] ${message}`;
  }

  debug(message: string, data?: LogData): void {
    if (!this.enabled) return;

    if (data !== undefined) {
      console.debug(this.format(LogLevel.DEBUG, message), data);
    } else {
      console.debug(this.format(LogLevel.DEBUG, message));
    }
  }

  info(message: string, data?: LogData): void {
    if (!this.enabled) return;

    if (data !== undefined) {
      console.info(this.format(LogLevel.INFO, message), data);
    } else {
      console.info(this.format(LogLevel.INFO, message));
    }
  }

  warn(message: string, data?: LogData): void {
    if (data !== undefined) {
      console.warn(this.format(LogLevel.WARN, message), data);
    } else {
      console.warn(this.format(LogLevel.WARN, message));
    }
  }

error(message: string, error?: unknown): void {
  if (error !== undefined) {
    console.error(
      this.format(LogLevel.ERROR, message),
      error
    );
  } else {
    console.error(
      this.format(LogLevel.ERROR, message)
    );
  }
}

  group(title: string): void {
    if (!this.enabled) return;
    console.group(title);
  }

  groupEnd(): void {
    if (!this.enabled) return;
    console.groupEnd();
  }

  table(data: unknown): void {
    if (!this.enabled) return;
    console.table(data);
  }

  time(label: string): void {
    if (!this.enabled) return;
    console.time(label);
  }

  timeEnd(label: string): void {
    if (!this.enabled) return;
    console.timeEnd(label);
  }
}

export const logger = new Logger();

export default logger;