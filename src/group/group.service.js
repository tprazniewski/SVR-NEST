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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GroupService = void 0;
var common_1 = require("@nestjs/common");
var group_model_1 = require("./group.model");
var mongoose_1 = require("@nestjs/mongoose");
var isValidObjectId_1 = require("../utils/isValidObjectId");
var device_service_1 = require("../device/device.service");
var ObjectID = require('mongodb').ObjectID;
var GroupService = /** @class */ (function () {
    function GroupService(groupModel, deviceService) {
        this.groupModel = groupModel;
        this.deviceService = deviceService;
    }
    GroupService.prototype.createGroup = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var newDevice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newDevice = new this.groupModel(name);
                        return [4 /*yield*/, newDevice.save()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GroupService.prototype.getGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.groupModel.find()];
            });
        });
    };
    GroupService.prototype.getGroup = function (idOrName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.groupModel.findOne((0, isValidObjectId_1.isValidObjectId)(idOrName))];
            });
        });
    };
    GroupService.prototype.updateGroup = function (idOrName, name) {
        // return this.groupModel.updateOne({name: oldName}, {name: newName},{new:true})
        return this.groupModel.findOneAndUpdate((0, isValidObjectId_1.isValidObjectId)(idOrName), name, {
            "new": true
        });
    };
    GroupService.prototype.findById = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupModel.findOne({ _id: _id })];
                    case 1:
                        found = _a.sent();
                        if (!found) {
                            throw new common_1.NotFoundException("Group with id: ".concat(_id, " not found"));
                        }
                        return [2 /*return*/, found];
                }
            });
        });
    };
    GroupService.prototype.createOrUpdate = function (deviceId, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupModel.findOneAndUpdate(filter, { $push: { devices: deviceId } }, { upsert: true, "new": true })];
                    case 1:
                        group = _a.sent();
                        return [2 /*return*/, group];
                }
            });
        });
    };
    GroupService.prototype.deleteOrUpdateByFilter = function (deviceId, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupModel.findOneAndUpdate(filter, { $pull: { devices: deviceId } }, { upsert: true, "new": true })];
                    case 1:
                        group = _a.sent();
                        return [2 /*return*/, group];
                }
            });
        });
    };
    GroupService.prototype.deleteOrUpdateById = function (_id, deviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupModel.findOneAndUpdate({
                            _id: _id
                        }, { $pull: { devices: deviceId } }, { upsert: true, "new": true })];
                    case 1:
                        group = _a.sent();
                        return [2 /*return*/, group];
                }
            });
        });
    };
    GroupService.prototype.findByOneElementOfDevice = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupModel.find({
                            devices: {
                                $in: name
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GroupService.prototype.deleteGroupByFilter = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.groupModel.deleteOne(filter)];
            });
        });
    };
    GroupService.prototype.addToGroup = function (groupIdOrName, deviceIdOrName) {
        return __awaiter(this, void 0, void 0, function () {
            var group, device, deviceId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deviceService.getByFilter((0, isValidObjectId_1.isValidObjectId)(deviceIdOrName))];
                    case 1:
                        device = _a.sent();
                        if (!device) {
                            throw new common_1.NotFoundException("deviceId with id: ".concat(deviceIdOrName, " not found"));
                        }
                        deviceId = device._id.toString();
                        group = this.createOrUpdate(deviceId, (0, isValidObjectId_1.isValidObjectId)(groupIdOrName));
                        return [2 /*return*/, group];
                }
            });
        });
    };
    GroupService.prototype.deleteFromGroup = function (groupIdOrName, deviceIdOrName) {
        return __awaiter(this, void 0, void 0, function () {
            var device, deviceId, group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deviceService.getByFilter((0, isValidObjectId_1.isValidObjectId)(deviceIdOrName))];
                    case 1:
                        device = _a.sent();
                        if (!device) {
                            throw new common_1.NotFoundException("deviceId with id: ".concat(device, " not found"));
                        }
                        deviceId = device._id.toString();
                        return [4 /*yield*/, this.deleteOrUpdateByFilter(deviceId, (0, isValidObjectId_1.isValidObjectId)(groupIdOrName))];
                    case 2:
                        group = _a.sent();
                        console.log('group', group);
                        if (!(group.devices.length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.deleteGroupByFilter((0, isValidObjectId_1.isValidObjectId)(groupIdOrName))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, group];
                }
            });
        });
    };
    GroupService.prototype.getFilesByGroupId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = new ObjectID(id);
                        return [4 /*yield*/, this.groupModel.aggregate([
                                { $match: { _id: _id } },
                                { $unwind: '$devices' },
                                {
                                    $addFields: {
                                        deviceId: { $toObjectId: '$devices' }
                                    }
                                },
                                {
                                    $lookup: {
                                        from: 'devices',
                                        localField: 'deviceId',
                                        foreignField: '_id',
                                        as: 'deviceDetails'
                                    }
                                },
                                { $unwind: '$deviceDetails' },
                                {
                                    $group: {
                                        _id: '$_id',
                                        files: { $push: '$deviceDetails.files' }
                                    }
                                },
                            ])];
                    case 1:
                        files = _a.sent();
                        return [2 /*return*/, files];
                }
            });
        });
    };
    GroupService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(group_model_1.Group.name)),
        __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return device_service_1.DeviceService; })))
    ], GroupService);
    return GroupService;
}());
exports.GroupService = GroupService;
