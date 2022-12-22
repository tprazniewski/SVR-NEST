import {IsNotEmpty, IsOptional, IsArray} from "class-validator";

export class CreateDeviceDto {
    @IsOptional()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    files: string[];
}
