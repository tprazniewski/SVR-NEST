import { forwardRef, Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './device.model';
import { DeviceController } from './device.controller';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [
    forwardRef(() => GroupModule),
    MongooseModule.forFeatureAsync([
      {
        name: Device.name,
        useFactory: () => {
          return DeviceSchema.plugin(require('mongoose-unique-validator'));
        },
      },
    ]),
  ],
  providers: [DeviceService],
  exports: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
