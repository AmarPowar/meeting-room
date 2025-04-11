import { Injectable } from '@nestjs/common';
import { CustomLogger } from '../comman/customLogger';

@Injectable()
export class HealthCheckService {
  constructor(private readonly logger: CustomLogger) {}

  serviceStatus() {
    this.logger.log(`ServiceStatus Method Call .`);
    return { status: 'running' };
  }
}
