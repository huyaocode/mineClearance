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
var ClassFactory_1 = require("../ClassFactory");
var EventCenter_1 = require("../util/EventCenter");
var DifficultyPicker = /** @class */ (function (_super) {
    __extends(DifficultyPicker, _super);
    function DifficultyPicker() {
        var _this = _super.call(this) || this;
        _this.difficultyMap = {
            Easy: '简单',
            General: '普通',
            Hard: '困难'
        };
        _this.id = 'difficulty';
        setTimeout(function () {
            _this.bindEvent();
        });
        return _this;
    }
    DifficultyPicker.prototype.bindEvent = function () {
        var _this = this;
        this.dom = document.getElementById(this.id);
        this.dom.onclick = function (e) {
            var value = e.target.value;
            if (value != undefined && value != 0) {
                _this.reStartGame(value);
            }
        };
    };
    DifficultyPicker.prototype.reStartGame = function (difficulty) {
        try {
            var eventCenter = EventCenter_1.default();
            eventCenter.clearAll();
            var director = ClassFactory_1.default("Director" + difficulty);
            window['difficulty'] = difficulty;
            director.construct('app');
        }
        catch (e) {
            console.error(e);
        }
    };
    DifficultyPicker.prototype.getHTMLStr = function () {
        var difficulty = window['difficulty'];
        return "\n      <div class=\"option\">\n        <span>\u96BE\u5EA6: </span>\n        <span>" + this.difficultyMap[difficulty] + "</span>\n        <ul class=\"difficul\" id=\"difficulty\">\n            <li><label><input name=\"difficultyopt\" type=\"radio\" value=\"Easy\" " + (difficulty ==
            'Easy' && 'checked') + "/><span></span>" + this.difficultyMap.Easy + "</label></li>\n            <li><label><input name=\"difficultyopt\" type=\"radio\" value=\"General\" " + (difficulty ==
            'General' && 'checked') + "/><span></span>" + this.difficultyMap.General + "</label></li>\n            <li><label><input name=\"difficultyopt\" type=\"radio\" value=\"Hard\" " + (difficulty ==
            'Hard' && 'checked') + "/><span></span>" + this.difficultyMap.Hard + "</label></li>\n        </ul>\n      </div>\n    ";
    };
    return DifficultyPicker;
}(DOM_1.default));
exports.default = DifficultyPicker;
//# sourceMappingURL=DifficultyPicker.js.map