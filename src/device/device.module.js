"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DeviceModule = void 0;
var common_1 = require("@nestjs/common");
var device_service_1 = require("./device.service");
var mongoose_1 = require("@nestjs/mongoose");
var device_model_1 = require("./device.model");
var device_controller_1 = require("./device.controller");
var group_module_1 = require("../group/group.module");
var DeviceModule = /** @class */ (function () {
    function DeviceModule() {
    }
    DeviceModule = __decorate([
        (0, common_1.Module)({
            imports: [
                (0, common_1.forwardRef)(function () { return group_module_1.GroupModule; }),
                mongoose_1.MongooseModule.forFeatureAsync([
                    {
                        name: device_model_1.Device.name,
                        useFactory: function () {
                            return device_model_1.DeviceSchema.plugin(require('mongoose-unique-validator'));
                        }
                    },
                ]),
            ],
            providers: [device_service_1.DeviceService],
            exports: [device_service_1.DeviceService],
            controllers: [device_controller_1.DeviceController]
        })
    ], DeviceModule);
    return DeviceModule;
}());
exports.DeviceModule = DeviceModule;
