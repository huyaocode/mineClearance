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
var RankList = /** @class */ (function (_super) {
    __extends(RankList, _super);
    function RankList() {
        var _this = _super.call(this) || this;
        _this.id = 'rank';
        setTimeout(function () {
            _this.bindEvent();
        });
        return _this;
    }
    RankList.prototype.getHTMLStr = function () {
        return "\n        <div class=\"option\" id=\"rank\">\n            \u6392\u884C\u699C\n        </div>\n    ";
    };
    RankList.prototype.bindEvent = function () {
        var _this = this;
        this.dom = document.getElementById(this.id);
        var eventCenter = EventCenter_1.default();
        this.dom.onclick = function () {
            _this.showRankList();
        };
        eventCenter.listen('showRankList', function () {
            _this.showRankList();
        });
    };
    RankList.prototype.getRackList = function () {
        var rankStr = localStorage.getItem('rank' + window['difficulty']);
        var rankList = [];
        if (rankStr) {
            rankList = JSON.parse(rankStr);
        }
        return rankList;
    };
    RankList.prototype.showRankList = function () {
        var rankList = this.getRackList();
        var areaDom = document.getElementById('minearea');
        var ranklistStr = "\n      <table border=\"1\" cellspacing=\"0\">\n        <tr>\n          <th>\u59D3\u540D</th>\n          <th>\u8017\u6642</th>\n        </tr>\n    ";
        for (var i = 0; i < rankList.length; i++) {
            ranklistStr += "\n        <tr>\n          <td>" + rankList[i].name + "</td> \n          <td>" + rankList[i].time + "</td>\n        </tr>\n      ";
        }
        ranklistStr + '</table>';
        areaDom.innerHTML = "<div class=\"rank\" \n        style=\"width: " + config_1.default[window['difficulty'].toLowerCase()].row *
            config_1.default.blockWidth + "px; min-height: " + (config_1.default[window['difficulty'].toLowerCase()].col *
            config_1.default.blockHeight -
            20) + "px\"> \n      " + ranklistStr + " \n      </div>";
    };
    __decorate([
        log_1.default('rank'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RankList.prototype, "showRankList", null);
    return RankList;
}(DOM_1.default));
exports.default = RankList;
//# sourceMappingURL=RackList.js.map