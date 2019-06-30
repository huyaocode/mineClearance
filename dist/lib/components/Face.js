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
var ClassFactory_1 = require("../ClassFactory");
var faceImg = {
    smile: "<img src=\"./img/face_normal.bmp\" alt=\"\">",
    cry: "<img src=\"./img/face_fail.bmp\" alt=\"\">"
};
var Face = /** @class */ (function (_super) {
    __extends(Face, _super);
    function Face() {
        var _this = _super.call(this) || this;
        _this.id = 'face';
        setTimeout(function () {
            _this.bindEvent();
        });
        return _this;
    }
    Face.prototype.getHTMLStr = function () {
        return "\n      <div class=\"face\" id=\"face\">\n        " + faceImg.smile + "\n      </div>\n    ";
    };
    Face.prototype.bindEvent = function () {
        var _this = this;
        this.dom = document.getElementById(this.id);
        this.dom.onclick = function () {
            _this.reStartGame();
        };
        var eventCenter = EventCenter_1.default();
        eventCenter.listen('bomb_exploded', this.cryFace.bind(this));
    };
    Face.prototype.cryFace = function () {
        this.dom.innerHTML = faceImg.cry;
    };
    /**
     * 使用反射，重新构建APP
     */
    Face.prototype.reStartGame = function () {
        try {
            var eventCenter = EventCenter_1.default();
            eventCenter.clearAll();
            var director = ClassFactory_1.default("Director" + window['difficulty']);
            director.construct('app');
        }
        catch (e) {
            console.error(e);
        }
    };
    return Face;
}(DOM_1.default));
exports.default = Face;
//# sourceMappingURL=Face.js.map