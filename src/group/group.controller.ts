import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group-dto';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('/')
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Get('/')
  getDevices() {
    return this.groupService.getGroups();
  }

  @Get('/:idOrName')
  getDevice(@Param('idOrName') idOrName: string) {
    return this.groupService.getGroup(idOrName);
  }

  @Put('/:oldName')
  updateGroup(
    @Param('oldName') idOrName: string,
    @Body() name: CreateGroupDto,
  ) {
    return this.groupService.updateGroup(idOrName, name);
  }

  @Put('/:groupIdOrName/devices/:deviceId')
  addDeviceToGroup(
    @Param('groupIdOrName') groupIdOrName: string,
    @Param('deviceId') deviceId: string,
  ) {
    return this.groupService.addToGroup(groupIdOrName, deviceId);
  }

  @Delete('/:groupIdOrName/devices/:deviceId')
  deleteDeviceFromGroup(
    @Param('groupIdOrName') groupIdOrName: string,
    @Param('deviceId') deviceId: string,
  ) {
    return this.groupService.deleteFromGroup(groupIdOrName, deviceId);
  }

  @Get('/:groupIdOrName/devices/files')
  getFilesByGroupId(@Param('groupIdOrName') groupIdOrName: string) {
    return this.groupService.getFilesByGroupId(groupIdOrName);
  }
}
