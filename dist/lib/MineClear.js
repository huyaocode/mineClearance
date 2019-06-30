"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MineClear = /** @class */ (function () {
    function MineClear() {
    }
    MineClear.prototype.setDifficultyPickerStr = function (difficultyPicker) {
        this.difficultyPicker = difficultyPicker;
    };
    MineClear.prototype.getDifficultyPickerStr = function () {
        return this.difficultyPicker.getHTMLStr();
    };
    MineClear.prototype.setFace = function (face) {
        this.face = face;
    };
    MineClear.prototype.getFaceStr = function () {
        return this.face.getHTMLStr();
    };
    MineClear.prototype.setTimer = function (timer) {
        this.timer = timer;
    };
    MineClear.prototype.getTimerStr = function () {
        return this.timer.getHTMLStr();
    };
    MineClear.prototype.setFlagCounter = function (flagCounter) {
        this.flagCounter = flagCounter;
    };
    MineClear.prototype.getFlagCounterStr = function () {
        return this.flagCounter.getHTMLStr();
    };
    MineClear.prototype.setMineArea = function (mineArea) {
        this.mineArea = mineArea;
    };
    MineClear.prototype.getMineAreaStr = function () {
        return this.mineArea.getHTMLStr();
    };
    MineClear.prototype.setRankList = function (rankList) {
        this.rankList = rankList;
    };
    MineClear.prototype.getRankList = function () {
        return this.rankList.getHTMLStr();
    };
    MineClear.prototype.setAddRank = function (rankList) {
        this.addRank = rankList;
    };
    MineClear.prototype.getAddRank = function () {
        return this.rankList.getHTMLStr();
    };
    return MineClear;
}());
exports.default = MineClear;
//# sourceMappingURL=MineClear.js.map