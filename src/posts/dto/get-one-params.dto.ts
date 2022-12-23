import { IsNumberString } from 'class-validator';

export class GetOneParamsDto {
  @IsNumberString()
  id: number;
}
