"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MineClear_1 = require("../MineClear");
var Face_1 = require("../components/Face");
var FlagCounter_1 = require("../components/FlagCounter");
var Timer_1 = require("../components/Timer");
var DifficultyPicker_1 = require("../components/DifficultyPicker");
var MineArea_1 = require("../components/MineArea");
var RackList_1 = require("../components/RackList");
var GameWin_1 = require("../components/GameWin");
var Build = /** @class */ (function () {
    function Build() {
        this.mineClear = new MineClear_1.default();
    }
    Build.prototype.renderMineClear = function (appId) {
        var appDom = document.getElementById(appId);
        var str = this.getMineClearStr();
        appDom.innerHTML = str;
    };
    Build.prototype.getMineClearStr = function () {
        return "\n    <div class=\"wrapper\">\n      <div class=\"head\">\n          <img src=\"./img/mine.ico\" alt=\"\">\n          <h1>\u626B\u96F7</h1>\n      </div>\n      <div class=\"menu\">\n        " + this.mineClear.getDifficultyPickerStr() + "\n        " + this.mineClear.getRankList() + "\n      </div>\n      <div class=\"main\">\n          <!-- \u72B6\u6001\u680F -->\n          <div class=\"state\">\n              " + this.mineClear.getFlagCounterStr() + "\n              " + this.mineClear.getFaceStr() + "\n              " + this.mineClear.getTimerStr() + "\n          </div>\n          <!-- \u96F7\u533A -->\n          " + this.mineClear.getMineAreaStr() + "\n      </div>\n  </div>\n    ";
    };
    Build.prototype.createMineArea = function (config) {
        var mineArea = new MineArea_1.default(config.col, config.row, config.mineProbability);
        this.mineClear.setMineArea(mineArea);
        return mineArea.mineNum;
    };
    Build.prototype.createDifficultyPicker = function () {
        this.mineClear.setDifficultyPickerStr(new DifficultyPicker_1.default());
    };
    Build.prototype.createFace = function () {
        this.mineClear.setFace(new Face_1.default());
    };
    Build.prototype.createFlagCounter = function (minNum) {
        this.mineClear.setFlagCounter(new FlagCounter_1.default(minNum));
    };
    Build.prototype.createTimer = function () {
        this.mineClear.setTimer(new Timer_1.default());
    };
    Build.prototype.createRackList = function () {
        this.mineClear.setRankList(new RackList_1.default());
    };
    Build.prototype.createAddRank = function () {
        this.mineClear.setAddRank(new GameWin_1.default());
    };
    return Build;
}());
exports.default = Build;
//# sourceMappingURL=Build.js.map