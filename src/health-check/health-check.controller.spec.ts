import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;
  let healthCheckService: HealthCheckService;

  beforeEach(async () => {
    const mockHealthCheckService = {
      serviceStatus: jest.fn().mockReturnValue({ status: 'ok' }),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: mockHealthCheckService,
        },
      ],
    }).compile();

    healthCheckController = moduleRef.get<HealthCheckController>(HealthCheckController);
    healthCheckService = moduleRef.get<HealthCheckService>(HealthCheckService);
  });

  it('should return service status', () => {
    const result = healthCheckController.getServiceStatus();
    expect(result).toEqual({ status: 'ok' });
    expect(healthCheckService.serviceStatus).toHaveBeenCalled();
  });
});
