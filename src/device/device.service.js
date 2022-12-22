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
exports.DeviceService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var device_model_1 = require("./device.model");
var isValidObjectId_1 = require("../utils/isValidObjectId");
var group_service_1 = require("../group/group.service");
var DeviceService = /** @class */ (function () {
    function DeviceService(deviceModel, groupService) {
        this.deviceModel = deviceModel;
        this.groupService = groupService;
    }
    DeviceService.prototype.getDevices = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.deviceModel.find()];
            });
        });
    };
    DeviceService.prototype.createDevice = function (createDeviceDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.deviceModel.create(createDeviceDto)];
            });
        });
    };
    DeviceService.prototype.deleteDeviceById = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var listOfGroups, i, group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupService.findByOneElementOfDevice(_id)];
                    case 1:
                        listOfGroups = _a.sent();
                        if (!listOfGroups) return [3 /*break*/, 6];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < listOfGroups.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.groupService.deleteOrUpdateById(listOfGroups[i]._id.toString(), _id)];
                    case 3:
                        group = _a.sent();
                        if (!(group.devices.length === 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.groupService.deleteGroupByFilter({
                                _id: group._id.toString()
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, this.deviceModel.deleteOne({ _id: _id })];
                }
            });
        });
    };
    DeviceService.prototype.getDeviceById = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deviceModel.findOne({ _id: _id })];
                    case 1:
                        a = _a.sent();
                        if (!a) {
                            throw new common_1.NotFoundException("deviceId with id: ".concat(_id, " not found"));
                        }
                        return [2 /*return*/, a];
                }
            });
        });
    };
    DeviceService.prototype.updateDevice = function (idOrName, name) {
        return __awaiter(this, void 0, void 0, function () {
            var device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deviceModel.findOneAndUpdate((0, isValidObjectId_1.isValidObjectId)(idOrName), name, {
                            "new": true
                        })];
                    case 1:
                        device = _a.sent();
                        return [2 /*return*/, device];
                }
            });
        });
    };
    DeviceService.prototype.create = function (createDevice) {
        return __awaiter(this, void 0, void 0, function () {
            var newDevice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newDevice = new this.deviceModel(createDevice);
                        return [4 /*yield*/, newDevice.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeviceService.prototype.getByFilter = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.deviceModel.findOne(filter)];
            });
        });
    };
    DeviceService.prototype.findByIds = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.deviceModel.find({ _id: { $in: ids } })];
            });
        });
    };
    DeviceService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(device_model_1.Device.name)),
        __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return group_service_1.GroupService; })))
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
