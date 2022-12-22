import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateGroupDto {
    @IsOptional()
    @IsNotEmpty()
    name: string;

}