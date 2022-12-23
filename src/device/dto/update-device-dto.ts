import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDeviceDto {
  @IsString()
  @IsNotEmpty()
  file: string;
}
