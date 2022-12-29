import { IsNotEmpty, IsString } from 'class-validator';

export class FileDto {
  @IsNotEmpty()
  @IsString()
  file: string;
}
