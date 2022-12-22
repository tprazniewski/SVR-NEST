import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceModule } from './device/device.module';
import {GroupModule} from './group/group.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as process from "process";
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [DeviceModule, GroupModule,ConfigModule.forRoot({

    envFilePath: ['.env']
  }),   MongooseModule.forRootAsync({

    useFactory: () => ({
      uri: process.env.CONNECTION_STRING,

    }),
}),],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
