import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  files: string[];
}
