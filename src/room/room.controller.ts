/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoomService } from './room.service';
import { PeopleDto, IntroTimeDto } from './dto/create-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/people')
  setRoomCapacity(@Body() peopleDto: PeopleDto) {
    return this.roomService.createRoomCapacity(peopleDto);
  }

  @Post('/intro-time')
  setPairIntrolTime(@Body() introTimeDto: IntroTimeDto) {
    return this.roomService.createPairIntroTime(introTimeDto);
  }

  @Get('/total-intro-time')
  getTotoalIntroTime() {
    return this.roomService.totalIntroTime();
  }

  @Get('/people-list')
  getPopleList() {
    return this.roomService.peopleList();
  }
}



