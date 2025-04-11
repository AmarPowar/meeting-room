import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { PeopleDto, IntroTimeDto } from './dto/create-room.dto';

describe('RoomController', () => {
  let roomController: RoomController;
  let roomService: RoomService;

  const mockRoomService = {
    createRoomCapacity: jest.fn().mockImplementation((dto: PeopleDto) => ({
      message: `Room capacity set to ${dto.number}`,
    })),
    createPairIntroTime: jest.fn().mockImplementation((dto: IntroTimeDto) => ({
      message: `Intro time set to ${dto.time} minutes`,
    })),
    totalIntroTime: jest.fn().mockReturnValue({ totalTime: 60 }),
    peopleList: jest.fn().mockReturnValue(['Alice', 'Bob', 'Charlie']),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        {
          provide: RoomService,
          useValue: mockRoomService,
        },
      ],
    }).compile();

    roomController = moduleRef.get<RoomController>(RoomController);
    roomService = moduleRef.get<RoomService>(RoomService);
  });

  it('should set room capacity', () => {
    const dto: PeopleDto = { number: 5 };
    expect(roomController.setRoomCapacity(dto)).toEqual({
      message: 'Room capacity set to 5',
    });
    expect(roomService.createRoomCapacity).toHaveBeenCalledWith(dto);
  });

  it('should set pair intro time', () => {
    const dto: IntroTimeDto = { time: 10 };
    expect(roomController.setPairIntrolTime(dto)).toEqual({
      message: 'Intro time set to 10 minutes',
    });
    expect(roomService.createPairIntroTime).toHaveBeenCalledWith(dto);
  });

  it('should get total intro time', () => {
    expect(roomController.getTotoalIntroTime()).toEqual({ totalTime: 60 });
    expect(roomService.totalIntroTime).toHaveBeenCalled();
  });

  it('should get people list', () => {
    expect(roomController.getPopleList()).toEqual(['Alice', 'Bob', 'Charlie']);
    expect(roomService.peopleList).toHaveBeenCalled();
  });
});
