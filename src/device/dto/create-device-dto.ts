import { IsNotEmpty } from 'class-validator';
export class CreateDeviceDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    files: string[];
}