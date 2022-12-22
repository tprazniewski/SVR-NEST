import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Device } from './device.model';

@Injectable()
export class DeviceSeeders implements Seeder {
  constructor(
    @InjectModel(Device.name) private readonly device: Model<Device>,
  ) {}

  async seed(): Promise<any> {
    // Insert into the database.
    return this.device.insertMany(data);
  }

  async drop(): Promise<any> {
    return this.device.deleteMany({});
  }
}

const data = [
  {
    name: 'FirstName',
    files: ['notavirus.exe', 'deathstarblueprint.pdf'],
  },
  {
    name: 'SecondName',
    files: ['deathstarblueprint.pdf', 'peterdinklagenudes.zip'],
  },
  {
    name: 'ThirdName',
    files: ['peterdinklagenudes.zip', 'keyboardcat.mp4'],
  },
];
