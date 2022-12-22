"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupModule = void 0;
var common_1 = require("@nestjs/common");
var group_service_1 = require("./group.service");
var device_module_1 = require("../device/device.module");
var mongoose_1 = require("@nestjs/mongoose");
var group_model_1 = require("./group.model");
var group_controller_1 = require("./group.controller");
var GroupModule = /** @class */ (function () {
    function GroupModule() {
    }
    GroupModule = __decorate([
        (0, common_1.Module)({
            imports: [
                (0, common_1.forwardRef)(function () { return device_module_1.DeviceModule; }),
                mongoose_1.MongooseModule.forFeatureAsync([{ name: group_model_1.Group.name, useFactory: function () {
                            return group_model_1.GroupSchema.plugin(require('mongoose-unique-validator'));
                        } }]),
            ],
            providers: [group_service_1.GroupService],
            exports: [group_service_1.GroupService],
            controllers: [group_controller_1.GroupController]
        })
    ], GroupModule);
    return GroupModule;
}());
exports.GroupModule = GroupModule;
