"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Build_1 = require("../Buider/Build");
var log_1 = require("../util/log");
var Director = /** @class */ (function () {
    function Director() {
        this.build = new Build_1.default();
    }
    Director.prototype.construct = function (appId) {
        this.build.createDifficultyPicker();
        this.build.createFace();
        this.build.createTimer();
        var mineNum = this.build.createMineArea(this.config);
        this.build.createFlagCounter(mineNum);
        this.build.createRackList();
        this.build.createAddRank();
        // 渲染
        this.build.renderMineClear(appId);
    };
    __decorate([
        log_1.default('start'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], Director.prototype, "construct", null);
    return Director;
}());
exports.default = Director;
//# sourceMappingURL=Director.js.map