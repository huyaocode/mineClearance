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
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        var _this = _super.call(this) || this;
        _this.timer = null;
        _this.second = 0;
        _this.id = 'timer';
        setTimeout(function () {
            _this.bindEvent();
        });
        return _this;
    }
    Timer.prototype.getHTMLStr = function () {
        return "\n      <div class=\"timer\" id=\"timer\">\n          " + getNumberHTMLStr_1.default(this.second) + "\n      </div>\n    ";
    };
    Timer.prototype.bindEvent = function () {
        this.dom = document.getElementById(this.id);
        var eventCenter = EventCenter_1.default();
        eventCenter.listen('bomb_exploded', this.endTimer.bind(this));
        eventCenter.listen('game_win', this.endTimer.bind(this));
        eventCenter.listen('minearea_click', this.startTimer.bind(this));
    };
    Timer.prototype.startTimer = function () {
        var _this = this;
        if (!this.timer) {
            this.timer = setInterval(function () {
                _this.secondAdd();
            }, 1000);
        }
    };
    Timer.prototype.endTimer = function () {
        clearInterval(this.timer);
    };
    Timer.prototype.secondAdd = function () {
        this.second++;
        window['palyTime'] = this.second;
        this.dom.innerHTML = getNumberHTMLStr_1.default(this.second);
    };
    return Timer;
}(DOM_1.default));
exports.default = Timer;
//# sourceMappingURL=Timer.js.map