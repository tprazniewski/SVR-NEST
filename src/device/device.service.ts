import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from './device.model';
import { Model } from 'mongoose';
import { CreateDeviceDto } from './dto/create-device-dto';
import { nameOrIdQuery } from '../utils/nameOrIdQuery';
import { GroupService } from '../group/group.service';
import { Ifilter } from '../utils/interfaces';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
  ) {}

  async getDevices(): Promise<Device[]> {
    return this.deviceModel.find();
  }

  async createDevice(createDeviceDto: CreateDeviceDto): Promise<Device> {
    return this.deviceModel.create(createDeviceDto);
  }

  async deleteDeviceById(_id): Promise<any> {
    const listOfGroups = await this.groupService.findByOneElementOfDevice(_id);
    if (listOfGroups) {
      for (let i = 0; i < listOfGroups.length; i++) {
        const group = await this.groupService.deleteOrUpdateById(
          listOfGroups[i]._id.toString(),
          _id,
        );
        if (group.devices.length === 0) {
          await this.groupService.deleteGroupByFilter({
            _id: group._id.toString(),
          });
        }
      }
    }
    const result = await this.deviceModel.deleteOne({ _id });
    return result;
  }

  async getDeviceByIdOrName(idOrName): Promise<Device> {
    const result = nameOrIdQuery(idOrName);
    const device = await this.deviceModel.findOne(result);
    if (!device) {
      throw new NotFoundException(
        `deviceId with idOrName: ${idOrName} not found`,
      );
    }
    return device;
  }

  async updateDeviceFile(idOrName: string, file: string): Promise<Device> {
    const device = await this.deviceModel.findOneAndUpdate(
      nameOrIdQuery(idOrName),
      { $push: { files: file } },
      { new: true },
    );
    if (!device) {
      throw new NotFoundException(
        `deviceId with idOrName: ${idOrName} not found`,
      );
    }
    return device;
  }
  async deleteDeviceFile(idOrName: string, file: string): Promise<Device> {
    const device = await this.deviceModel.findOneAndUpdate(
      nameOrIdQuery(idOrName),
      { $pull: { files: file } },
      { new: true },
    );
    if (!device) {
      throw new NotFoundException(
        `deviceId with idOrName: ${idOrName} not found`,
      );
    }

    return device;
  }
  async create(createDevice: any): Promise<Device> {
    const newDevice = new this.deviceModel(createDevice);
    return await newDevice.save();
  }

  async getByFilter(filter: Ifilter): Promise<Device> {
    return this.deviceModel.findOne(filter);
  }
}
