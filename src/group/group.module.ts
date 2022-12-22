import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { DeviceModule } from 'src/device/device.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './group.model';
import { GroupController } from './group.controller';
import { DeviceSchema } from '../device/device.model';

@Module({
  imports: [
    forwardRef(() => DeviceModule),
    MongooseModule.forFeatureAsync([
      {
        name: Group.name,
        useFactory: () => {
          return GroupSchema.plugin(require('mongoose-unique-validator'));
        },
      },
    ]),
  ],
  providers: [GroupService],
  exports: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
