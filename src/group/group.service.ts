import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { Group, GroupDocument } from "./group.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { nameOrIdQuery } from "../utils/nameOrIdQuery";
import { DeviceService } from "../device/device.service";
import { CreateGroupDto } from "./dto/create-group-dto";
import { nameOrObjectIdQuery } from "../utils/nameOrObjectIdQuery";
import { Ifilter } from "../utils/interfaces";

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @Inject(forwardRef(() => DeviceService))
    private deviceService: DeviceService
  ) {}

  async createGroup(name: CreateGroupDto): Promise<Group> {
    const newDevice = new this.groupModel(name);
    return await newDevice.save();
  }

  async getGroups(): Promise<Group[]> {
    return this.groupModel.find();
  }

  async getGroup(idOrName: string): Promise<Group> {
    return this.groupModel.findOne(nameOrIdQuery(idOrName));
  }

  async updateGroup(idOrName: string, name: CreateGroupDto): Promise<Group> {
    return this.groupModel.findOneAndUpdate(nameOrIdQuery(idOrName), name, {
      new: true,
    });
  }

  async findById(_id: string): Promise<Group> {
    const found = await this.groupModel.findOne({ _id });
    if (!found) {
      throw new NotFoundException(`Group with id: ${_id} not found`);
    }
    return found;
  }

  async createOrUpdate(deviceId: string, filter: Ifilter): Promise<Group> {
    const group = await this.groupModel.findOneAndUpdate(
      filter,
      { $push: { devices: deviceId } },
      { upsert: true, new: true }
    );
    return group;
  }

  async deleteOrUpdateByFilter(
    deviceId: string,
    filter: Ifilter
  ): Promise<Group> {
    const group = await this.groupModel.findOneAndUpdate(
      filter,
      { $pull: { devices: deviceId } },
      { upsert: true, new: true }
    );
    return group;
  }

  async deleteOrUpdateById(_id: string, deviceId: string): Promise<Group> {
    const group = await this.groupModel.findOneAndUpdate(
      {
        _id,
      },
      { $pull: { devices: deviceId } },
      { upsert: true, new: true }
    );
    return group;
  }

  async findByOneElementOfDevice(name: string) {
    return this.groupModel.find({
      devices: {
        $in: name,
      },
    });
  }

  async deleteGroupByFilter(filter: Ifilter) {
    return this.groupModel.deleteOne(filter);
  }

  async addToGroup(
    groupIdOrName: string,
    deviceIdOrName: string
  ): Promise<Group> {
    let group;
    let device;
    let deviceId;
    device = await this.deviceService.getByFilter(
      nameOrIdQuery(deviceIdOrName)
    );

    if (!device) {
      throw new NotFoundException(
        `deviceId with id: ${deviceIdOrName} not found`
      );
    }
    deviceId = device._id.toString();

    group = this.createOrUpdate(deviceId, nameOrIdQuery(groupIdOrName));

    return group;
  }

  async deleteFromGroup(
    groupIdOrName: string,
    deviceIdOrName: string
  ): Promise<Group> {
    let device = await this.deviceService.getByFilter(
      nameOrIdQuery(deviceIdOrName)
    );

    if (!device) {
      throw new NotFoundException(`deviceId with id: ${device} not found`);
    }
    let deviceId = device._id.toString();

    let group = await this.deleteOrUpdateByFilter(
      deviceId,
      nameOrIdQuery(groupIdOrName)
    );
    if (group.devices.length === 0) {
      await this.deleteGroupByFilter(nameOrIdQuery(groupIdOrName));
    }

    return group;
  }

  async getFilesByGroupId(nameOrId: string): Promise<string[]> {
    const files = await this.groupModel.aggregate([
      { $match: nameOrObjectIdQuery(nameOrId) },
      { $unwind: "$devices" },
      {
        $addFields: {
          deviceId: { $toObjectId: "$devices" },
        },
      },
      {
        $lookup: {
          from: "devices",
          localField: "deviceId",
          foreignField: "_id",
          as: "deviceDetails",
        },
      },
      { $unwind: "$deviceDetails" },
      {
        $group: {
          _id: "$_id",
          files: { $push: "$deviceDetails.files" },
        },
      },
      {
        $project: {
          uniqueFiles: {
            $reduce: {
              input: "$files",
              initialValue: [],
              in: { $setUnion: ["$$value", "$$this"] },
            },
          },
          _id: 0,
        },
      },
    ]);
    return files[0].uniqueFiles;
  }
}
