import { Module } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { HealthCheckController } from './health-check.controller';
import { CustomLogger } from 'src/comman/customLogger';

@Module({
  controllers: [HealthCheckController],
  providers: [HealthCheckService, CustomLogger],
})
export class HealthCheckModule {}
