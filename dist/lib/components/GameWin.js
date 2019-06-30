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
var DOM_1 = require("./DOM");
var EventCenter_1 = require("../util/EventCenter");
var config_1 = require("../config");
var log_1 = require("../util/log");
var AddRank = /** @class */ (function (_super) {
    __extends(AddRank, _super);
    function AddRank() {
        var _this = _super.call(this) || this;
        _this.rankLen = 10;
        setTimeout(function () {
            _this.bindEvent();
        });
        return _this;
    }
    AddRank.prototype.getHTMLStr = function () {
        return "\n        <div class=\"option\" id=\"rank\">\n            \u6392\u884C\u699C\n        </div>\n    ";
    };
    AddRank.prototype.bindEvent = function () {
        var _this = this;
        this.dom = document.getElementById(this.id);
        var eventCenter = EventCenter_1.default();
        eventCenter.listen('game_win', function () {
            _this.gameWin();
        });
    };
    AddRank.prototype.getRackList = function () {
        var rankStr = localStorage.getItem('rank' + window['difficulty']);
        var rankList = [];
        if (rankStr) {
            rankList = JSON.parse(rankStr);
        }
        return rankList;
    };
    AddRank.prototype.gameWin = function () {
        var rankList = this.getRackList();
        // 少于10人或超过10人但超过最后一名
        if (rankList.length < this.rankLen ||
            (rankList.length >= this.rankLen && window['palyTime'] < rankList[this.rankLen - 1].time)) {
            this.AddToRank(rankList);
        }
        else {
            alert('游戏胜利');
        }
    };
    /**
     * 写入前十排行榜
     * @param rankList
     */
    AddRank.prototype.AddToRank = function (rankList) {
        var _this = this;
        var areaDom = document.getElementById('minearea');
        var curConfig = config_1.default[window['difficulty'].toLowerCase()];
        areaDom.innerHTML = "<div class=\"rank\" style=\"width: " + curConfig.row *
            config_1.default.blockWidth + "px; min-height: " + (curConfig.col * config_1.default.blockHeight - 20) + "px\"> \n          \u6A21\u5F0F\uFF1A" + curConfig.name + " <br>\n          \u626B\u96F7\u6570\uFF1A" + window['mineNum'] + "<br>\n          \u8017\u65F6\uFF1A" + window['palyTime'] + "\u79D2<br>\n          \u8BF7\u7559\u4E0B\u5927\u540D<br>\n          <input type=\"text\" id=\"playername\" name=\"playername\">\n          <br>\n          <button id=\"submit\">\u63D0\u4EA4</button>\n        </div>\n      ";
        document.getElementById('submit').onclick = function () {
            _this.pushToRankList(rankList);
            var eventCenter = EventCenter_1.default();
            eventCenter.trigger('showRankList');
        };
    };
    AddRank.prototype.pushToRankList = function (rankList) {
        var name = document.getElementById('playername').value;
        rankList.push({
            name: name,
            time: window['palyTime']
        });
        rankList.sort(function (a, b) {
            return a.time - b.time;
        });
        rankList = rankList.slice(0, 10);
        localStorage.setItem('rank' + window['difficulty'], JSON.stringify(rankList));
    };
    __decorate([
        log_1.default('win'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AddRank.prototype, "gameWin", null);
    return AddRank;
}(DOM_1.default));
exports.default = AddRank;
//# sourceMappingURL=GameWin.js.map