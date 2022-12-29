import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Body,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device-dto';
import { idOrNameDto } from './dto/idOrName-dto';
import { FileDto } from './dto/file-dto';

@Controller('devices')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get('/')
  getDevices() {
    return this.deviceService.getDevices();
  }

  @Post('/')
  createDevices(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.createDevice(createDeviceDto);
  }

  @Get('/:idOrName')
  getDevice(@Param() idOrName: idOrNameDto) {
    return this.deviceService.getDeviceByIdOrName(idOrName.idOrName);
  }

  @Delete('/:idOrName')
  deleteDevice(@Param('idOrName') idOrName: string) {
    return this.deviceService.deleteDeviceById(idOrName);
  }

  @Put('/:idOrName/files/:file')
  updateDeviceFile(
    @Param('idOrName') idOrName: idOrNameDto,
    @Param('file') file: FileDto,
  ) {
    return this.deviceService.updateDeviceFile(idOrName.idOrName, file.file);
  }

  @Delete('/:idOrName/files/:file')
  deleteDeviceFile(
    @Param('idOrName') idOrName: idOrNameDto,
    @Param('file') file: FileDto,
  ) {
    return this.deviceService.deleteDeviceFile(idOrName.idOrName, file.file);
  }
}
