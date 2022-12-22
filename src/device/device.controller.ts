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

  @Get('/:id')
  getDevice(@Param('id') id: string) {
    return this.deviceService.getDeviceById(id);
  }

  @Delete('/:id')
  deleteDevice(@Param('id') id: string) {
    return this.deviceService.deleteDeviceById(id);
  }

  @Put('/:oldName')
  updateDevice(
    @Param('oldName') oldName: string,
    @Body() name: { name: string },
  ) {
    return this.deviceService.updateDevice(oldName, name);
  }
}
