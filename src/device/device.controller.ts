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
  getDevice(@Param('idOrName') idOrName: string) {
    console.log(idOrName);
    return this.deviceService.getDeviceByIdOrName(idOrName);
  }

  @Delete('/:id')
  deleteDevice(@Param('id') id: string) {
    return this.deviceService.deleteDeviceById(id);
  }

  @Put('/:nameOrId/files/:file')
  updateDeviceFile(
    @Param('nameOrId') nameOrId: string,
    @Param('file') file: string,
  ) {
    return this.deviceService.updateDeviceFile(nameOrId, file);
  }

  @Delete('/:nameOrId/files/:file')
  deleteDeviceFile(
    @Param('nameOrId') nameOrId: string,
    @Param('file') file: string,
  ) {
    return this.deviceService.deleteDeviceFile(nameOrId, file);
  }
}
