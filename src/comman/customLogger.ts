// custom-logger.service.ts
import { LoggerService, Injectable, LogLevel } from '@nestjs/common';

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: any) {
    console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
  }

  error(message: any, trace?: string) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    if (trace) console.error(trace);
  }

  warn(message: any) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  }

  debug(message: any) {
    console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
  }

  verbose(message: any) {
    console.info(`[VERBOSE] ${new Date().toISOString()} - ${message}`);
  }
}
