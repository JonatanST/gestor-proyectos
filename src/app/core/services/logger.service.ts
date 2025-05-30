import { Injectable } from '@angular/core';

// No necesitamos providedIn: 'root' aquí, lo haremos en app.config.ts
@Injectable()
export class LoggerService {
  log(message: string): void {
    // biome-ignore lint/suspicious/noConsole: Logger service needs console.log
    console.log(`[INFO]: ${message}`);
  }

  warn(message: string): void {
    // biome-ignore lint/suspicious/noConsole: Logger service needs console.log
    console.warn(`[WARN]: ${message}`);
  }

  error(message: string, error?: unknown): void {
    // biome-ignore lint/suspicious/noConsole: Logger service needs console.log
    console.error(`[ERROR]: ${message}`, error ?? '');
  }
}
