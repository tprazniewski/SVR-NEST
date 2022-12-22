"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AllExceptionsFilter = void 0;
var common_1 = require("@nestjs/common");
var mongodb_1 = require("mongodb");
var AllExceptionsFilter = /** @class */ (function () {
    function AllExceptionsFilter(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    AllExceptionsFilter.prototype["catch"] = function (exception, host) {
        var httpAdapter = this.httpAdapterHost;
        var ctx = host.switchToHttp();
        var httpStatus = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof common_1.HttpException) {
            return httpAdapter.reply(ctx.getResponse(), exception.getResponse(), httpStatus);
        }
        var responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest())
        };
        // Potentially could add swtich instead od if statement
        if (exception instanceof mongodb_1.MongoError) {
            if (exception.code === 11000) {
                var responseBody_1 = {
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: "We don't accept duplicatess"
                };
                return httpAdapter.reply(ctx.getResponse(), responseBody_1, httpStatus);
            }
        }
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    };
    AllExceptionsFilter = __decorate([
        (0, common_1.Catch)()
    ], AllExceptionsFilter);
    return AllExceptionsFilter;
}());
exports.AllExceptionsFilter = AllExceptionsFilter;
