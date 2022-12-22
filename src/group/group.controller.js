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
exports.GroupController = void 0;
var common_1 = require("@nestjs/common");
var GroupController = /** @class */ (function () {
    function GroupController(groupService) {
        this.groupService = groupService;
    }
    GroupController.prototype.createGroup = function (createGroupDto) {
        return this.groupService.createGroup(createGroupDto);
    };
    GroupController.prototype.getDevices = function () {
        return this.groupService.getGroups();
    };
    GroupController.prototype.getDevice = function (idOrName) {
        return this.groupService.getGroup(idOrName);
    };
    GroupController.prototype.updateGroup = function (idOrName, name) {
        return this.groupService.updateGroup(idOrName, name);
    };
    GroupController.prototype.addDeviceToGroup = function (groupIdOrName, deviceId) {
        return this.groupService.addToGroup(groupIdOrName, deviceId);
    };
    GroupController.prototype.deleteDeviceFromGroup = function (groupIdOrName, deviceId) {
        return this.groupService.deleteFromGroup(groupIdOrName, deviceId);
    };
    GroupController.prototype.getFilesByGroupId = function (groupIdOrName) {
        return this.groupService.getFilesByGroupId(groupIdOrName);
    };
    __decorate([
        (0, common_1.Post)('/'),
        __param(0, (0, common_1.Body)())
    ], GroupController.prototype, "createGroup");
    __decorate([
        (0, common_1.Get)('/')
    ], GroupController.prototype, "getDevices");
    __decorate([
        (0, common_1.Get)('/:idOrName'),
        __param(0, (0, common_1.Param)('idOrName'))
    ], GroupController.prototype, "getDevice");
    __decorate([
        (0, common_1.Put)('/:oldName'),
        __param(0, (0, common_1.Param)('oldName')),
        __param(1, (0, common_1.Body)())
    ], GroupController.prototype, "updateGroup");
    __decorate([
        (0, common_1.Put)('/:groupIdOrName/devices/:deviceId'),
        __param(0, (0, common_1.Param)('groupIdOrName')),
        __param(1, (0, common_1.Param)('deviceId'))
    ], GroupController.prototype, "addDeviceToGroup");
    __decorate([
        (0, common_1.Delete)('/:groupIdOrName/devices/:deviceId'),
        __param(0, (0, common_1.Param)('groupIdOrName')),
        __param(1, (0, common_1.Param)('deviceId'))
    ], GroupController.prototype, "deleteDeviceFromGroup");
    __decorate([
        (0, common_1.Get)('/:groupIdOrName/devices/files'),
        __param(0, (0, common_1.Param)('groupIdOrName'))
    ], GroupController.prototype, "getFilesByGroupId");
    GroupController = __decorate([
        (0, common_1.Controller)('groups')
    ], GroupController);
    return GroupController;
}());
exports.GroupController = GroupController;
