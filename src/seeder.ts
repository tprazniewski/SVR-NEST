
import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import {Device, DeviceSchema} from "./device/device.model";
import {DeviceSeeders} from "./device/device.seeders";
import { ConfigModule } from '@nestjs/config';
import * as process from "process";

seeder({
    imports: [ConfigModule.forRoot({
        envFilePath: ['.env']
    }),
    MongooseModule.forRoot(
        process.env.CONNECTION_STRING,
    ),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    ],
}).run([DeviceSeeders]);
