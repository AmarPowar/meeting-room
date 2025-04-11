/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PeopleDto, IntroTimeDto } from './dto/create-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import axios, { AxiosResponse } from 'axios';
import { calculateIntroTime } from 'src/comman/utils';
import { CustomLogger } from 'src/comman/customLogger';
import { RANDOM_USER_BASE_URL } from 'src/comman/constant';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    private readonly logger: CustomLogger,
  ) {}

  async getRoom(): Promise<Room> {
    this.logger.log(`getRoom Method Call !`);
    let room = await this.roomsRepository.findOne({ where: { id: 1 } });
    if (!room) {
      room = this.roomsRepository.create();
      await this.roomsRepository.save({ id: 1, ...room });
    }
    return room;
  }

  async getRandomUserList(peopleDto: PeopleDto): Promise<AxiosResponse> {
    this.logger.log(`getRandomUserList Method Call !`);
    return await axios.get(
      `${RANDOM_USER_BASE_URL}?results=${peopleDto.number}`,
    );
  }

  async createRoomCapacity(peopleDto: PeopleDto): Promise<{
    message: string;
  }> {
    this.logger.log(
      `createRoomCapacity Method Call. peopleCount : ${peopleDto.number}`,
    );

    try {
      const room = await this.getRoom();
      room.capacity = peopleDto.number;
      // Call third part API - https://randomuser.me/api/
      const response = await this.getRandomUserList(peopleDto);
      room.peopleList = response.data.results.map((user) => ({
        name: `${user.name.first} ${user.name.last}`,
        photo: user.picture.medium,
      }));

      room.totalPairIntroTime = calculateIntroTime(
        peopleDto.number,
        room.pairIntroTime,
      );

      await this.roomsRepository.save({ id: 1, ...room });
      this.logger.log(`createRoomCapacity Method executed Successfully !`);
      return { message: 'Record Created Successfully !' };
    } catch (error) {
      this.logger.error(`Failed createRoomCapacity Method Call !`);
      return { message: 'Something went wrong !' };
    }
  }

  async createPairIntroTime(
    introTimeDto: IntroTimeDto,
  ): Promise<{ message: string }> {
    this.logger.log(
      `CreatePairIntroTime Method Call . introTimeInput : ${introTimeDto.time}`,
    );
    try {
      const room = await this.getRoom();
      room.pairIntroTime = introTimeDto.time;
      room.totalPairIntroTime = calculateIntroTime(
        room.capacity,
        introTimeDto.time,
      );
      await this.roomsRepository.save(room);
      this.logger.log(`CreatePairIntroTime Method executed Successfully !`);
      return { message: 'Record Created Successfully !' };
    } catch (error) {
      this.logger.error(`Failed CreatePairIntroTime Method Call .`);
      return { message: 'Something went wrong !' };
    }
  }

  async totalIntroTime(): Promise<{ totalTime: number }> {
    this.logger.log(`TotalIntroTime Method Call .`);
    try {
      const room = await this.getRoom();
      this.logger.log(`TotalIntroTime Method executed Successfully !`);
      return { totalTime: room.totalPairIntroTime };
    } catch (e) {
      this.logger.error(`Failed To get TotalIntroTime .`);
      return { totalTime: 0 };
    }
  }

  async peopleList(): Promise< 0 | {name: string; photo: string;}[] > {
    this.logger.log(`TotalIntroTime Method Call .`);
    try {
      const room = await this.getRoom();
      this.logger.log(`TotalIntroTime Method executed Successfully !`);
      return room.peopleList;
    } catch (e) {
      this.logger.error(`Failed To get PeopleList .`);
      return 0;
    }
  }
}
