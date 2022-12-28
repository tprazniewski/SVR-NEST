import { IsString, IsNotEmpty } from 'class-validator';

export class idOrNameDto {
  @IsNotEmpty()
  @IsString()
  idOrName: string;
}
