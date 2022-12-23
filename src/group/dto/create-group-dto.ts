import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateGroupDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
}
