import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetOneParamsDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
