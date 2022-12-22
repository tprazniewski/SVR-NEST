"use strict";
exports.__esModule = true;
var nestjs_seeder_1 = require("nestjs-seeder");
var mongoose_1 = require("@nestjs/mongoose");
var device_model_1 = require("./device/device.model");
var device_seeders_1 = require("./device/device.seeders");
var config_1 = require("@nestjs/config");
var process = require("process");
(0, nestjs_seeder_1.seeder)({
    imports: [config_1.ConfigModule.forRoot({
            envFilePath: ['.env']
        }),
        mongoose_1.MongooseModule.forRoot(process.env.CONNECTION_STRING),
        mongoose_1.MongooseModule.forFeature([{ name: device_model_1.Device.name, schema: device_model_1.DeviceSchema }]),
    ]
}).run([device_seeders_1.DeviceSeeders]);
