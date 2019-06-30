"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("./DOM");
var Block_1 = require("./Block");
var EventCenter_1 = require("../util/EventCenter");
var MineArea = /** @class */ (function (_super) {
    __extends(MineArea, _super);
    function MineArea(col, row, mineProbability) {
        var _this = _super.call(this) || this;
        _this.mineNum = 0;
        _this.col = col;
        _this.row = row;
        _this.mineProbability = mineProbability;
        _this.createMineMap();
        _this.setPoint();
        setTimeout(function () { return _this.bindEvent(); });
        return _this;
    }
    MineArea.prototype.getHTMLStr = function () {
        this.id = 'minearea';
        var htmlStr = '';
        htmlStr += "<div class=\"mines\" id=\"minearea\"> <ul class=\"col\">";
        for (var y = 0; y < this.col; y++) {
            htmlStr += "<li><ul class=\"row\">";
            for (var x = 0; x < this.row; x++) {
                htmlStr += this.blockMap[y][x].getHTMLStr();
            }
            htmlStr += "</ul> </li>";
        }
        htmlStr += "</ul> </div>";
        return htmlStr;
    };
    // 创建map
    MineArea.prototype.createMineMap = function () {
        this.blockMap = [];
        //y 为纵向坐标
        for (var y = 0; y < this.col; y++) {
            this.blockMap[y] = [];
            //x 为横向坐标
            for (var x = 0; x < this.row; x++) {
                var isMine = this.getRandomByProbablity();
                isMine && this.mineNum++;
                this.blockMap[y].push(new Block_1.default(isMine, y, x));
            }
        }
        var eventCenter = EventCenter_1.default();
        window['mineNum'] = this.mineNum;
        eventCenter.trigger('setFlagNum', this.mineNum);
    };
    // 设置点数
    MineArea.prototype.setPoint = function () {
        var map = this.blockMap;
        for (var y = 0; y < this.col; y++) {
            for (var x = 0; x < this.row; x++) {
                if (map[y][x].isbomb()) {
                    if (y > 0 && !map[y - 1][x].isbomb()) {
                        map[y - 1][x].point++; //上方
                    }
                    if (y < this.col - 1 && !map[y + 1][x].isbomb()) {
                        map[y + 1][x].point++; //下方
                    }
                    if (x > 0 && !map[y][x - 1].isbomb()) {
                        map[y][x - 1].point++; //左方
                    }
                    if (x < this.row - 1 && !map[y][x + 1].isbomb()) {
                        map[y][x + 1].point++; //右方
                    }
                    if (x > 0 && y > 0 && !map[y - 1][x - 1].isbomb()) {
                        map[y - 1][x - 1].point++; //左上方
                    }
                    if (x < this.row - 1 && y > 0 && !map[y - 1][x + 1].isbomb()) {
                        map[y - 1][x + 1].point++; // 右上方
                    }
                    if (x > 0 && y < this.col - 1 && !map[y + 1][x - 1].isbomb()) {
                        map[y + 1][x - 1].point++; //左下方
                    }
                    if (x < this.row - 1 && y < this.col - 1 && !map[y + 1][x + 1].isbomb()) {
                        map[y + 1][x + 1].point++; //右下方
                    }
                }
            }
        }
    };
    // 绑定事件
    MineArea.prototype.bindEvent = function () {
        this.dom = document.getElementById(this.id);
        this.dom.onclick = function () {
            var eventCenter = EventCenter_1.default();
            eventCenter.trigger('minearea_click');
        };
    };
    MineArea.prototype.getRandomByProbablity = function () {
        return Math.random() > 1 - this.mineProbability;
    };
    return MineArea;
}(DOM_1.default));
exports.default = MineArea;
//# sourceMappingURL=MineArea.js.map