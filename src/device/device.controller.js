"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.DeviceController = void 0;
var common_1 = require("@nestjs/common");
var DeviceController = /** @class */ (function () {
    function DeviceController(deviceService) {
        this.deviceService = deviceService;
    }
    DeviceController.prototype.getDevices = function () {
        return this.deviceService.getDevices();
    };
    DeviceController.prototype.createDevices = function (createDeviceDto) {
        return this.deviceService.createDevice(createDeviceDto);
    };
    DeviceController.prototype.getDevice = function (id) {
        return this.deviceService.getDeviceById(id);
    };
    DeviceController.prototype.deleteDevice = function (id) {
        return this.deviceService.deleteDeviceById(id);
    };
    DeviceController.prototype.updateDevice = function (oldName, name) {
        return this.deviceService.updateDevice(oldName, name);
    };
    __decorate([
        (0, common_1.Get)('/')
    ], DeviceController.prototype, "getDevices");
    __decorate([
        (0, common_1.Post)('/'),
        __param(0, (0, common_1.Body)())
    ], DeviceController.prototype, "createDevices");
    __decorate([
        (0, common_1.Get)('/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], DeviceController.prototype, "getDevice");
    __decorate([
        (0, common_1.Delete)('/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], DeviceController.prototype, "deleteDevice");
    __decorate([
        (0, common_1.Put)('/:oldName'),
        __param(0, (0, common_1.Param)('oldName')),
        __param(1, (0, common_1.Body)())
    ], DeviceController.prototype, "updateDevice");
    DeviceController = __decorate([
        (0, common_1.Controller)('devices')
    ], DeviceController);
    return DeviceController;
}());
exports.DeviceController = DeviceController;
