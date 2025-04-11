import { IsNotEmpty } from 'class-validator';

export class PeopleDto {
  @IsNotEmpty({ message: 'peopleCount is required' })
  number: number;
}

export class IntroTimeDto {
  @IsNotEmpty({ message: 'time is required' })
  time: number;
}
