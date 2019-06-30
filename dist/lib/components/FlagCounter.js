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
var EventCenter_1 = require("../util/EventCenter");
var getNumberHTMLStr_1 = require("../util/getNumberHTMLStr");
var FlagCounter = /** @class */ (function (_super) {
    __extends(FlagCounter, _super);
    function FlagCounter(mineNum) {
        var _this = _super.call(this) || this;
        _this.flagNum = 0;
        _this.mineNum = 0;
        _this.correctFind = 0;
        _this.id = 'flagcounter';
        _this.flagNum = _this.mineNum = mineNum;
        setTimeout(function () {
            _this.bindEvent();
        });
        return _this;
    }
    FlagCounter.prototype.getHTMLStr = function () {
        return "\n      <div class=\"flagsNum\" id=\"flagcounter\">\n          " + getNumberHTMLStr_1.default(this.flagNum) + "\n      </div>\n    ";
    };
    FlagCounter.prototype.bindEvent = function () {
        var _this = this;
        this.dom = document.getElementById(this.id);
        var eventCenter = EventCenter_1.default();
        eventCenter.listen('setFlagNum', function (num) {
            _this.flagNum = num;
        });
        eventCenter.listen('flag_unuse', function () {
            _this.flagNum++;
            _this.dom.innerHTML = getNumberHTMLStr_1.default(_this.flagNum);
        });
        eventCenter.listen('flag_use', this.useFlag.bind(this));
        eventCenter.listen('correct_find', function () {
            _this.correctFind++;
        });
        eventCenter.listen('error_find', function () {
            _this.correctFind--;
        });
    };
    FlagCounter.prototype.useFlag = function (x, y) {
        var eventCenter = EventCenter_1.default();
        this.flagNum--;
        if (this.flagNum < 0) {
            eventCenter.trigger('flag_empty', x, y);
            return;
        }
        else if (this.flagNum == 0) {
            if (this.correctFind === this.mineNum) {
                eventCenter.trigger('game_win');
            }
        }
        this.dom.innerHTML = getNumberHTMLStr_1.default(this.flagNum);
    };
    return FlagCounter;
}(DOM_1.default));
exports.default = FlagCounter;
//# sourceMappingURL=FlagCounter.js.map