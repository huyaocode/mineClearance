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
var stopPropagation_1 = require("../util/stopPropagation");
var EventCenter_1 = require("../util/EventCenter");
var StateMachine_1 = require("../util/StateMachine");
var log_1 = require("../util/log");
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block(isBomb, posX, posY) {
        var _this = _super.call(this) || this;
        _this.point = 0;
        _this.hasClicked = false;
        _this.isBomb = isBomb;
        _this.x = posX;
        _this.y = posY;
        _this.id = "block_" + _this.x + "_" + _this.y;
        _this.listenEvent();
        _this.initState();
        setTimeout(function () { return _this.bindEvent(); });
        return _this;
    }
    // 初始化时获得其DOM字串
    Block.prototype.getHTMLStr = function () {
        return "<li id=\"" + this.id + "\" class=\"block\"></li>";
    };
    // 判断是否是雷
    Block.prototype.isbomb = function () {
        return this.isBomb;
    };
    // 注册事件监听
    Block.prototype.listenEvent = function () {
        var _this = this;
        var eventCenter = EventCenter_1.default();
        if (this.isBomb) {
            eventCenter.listen('bomb_exploded', this.exploade.bind(this));
        }
        else {
            eventCenter.listen('blank_expand', this.showPoint.bind(this));
            eventCenter.listen('bomb_exploded', function () {
                _this.hasClicked = true;
            });
        }
        // 当旗子用完了之后，标记为 ‘?’
        eventCenter.listen('flag_empty', function (x, y) {
            if (x === _this.x && y === _this.y) {
                _this.rightClickState.next();
            }
        });
    };
    // 使用转态模式管理扫雷时右键点击时方块的样式改变
    Block.prototype.initState = function () {
        var _this = this;
        var eventCenter = EventCenter_1.default();
        this.rightClickState = new StateMachine_1.default('blank', {
            blank: {
                nextState: 'flag',
                handler: function () {
                    _this.dom.innerHTML = "";
                }
            },
            flag: {
                nextState: 'doubt',
                handler: function () {
                    _this.dom.innerHTML = "<img src=\"./img/flag.bmp\" alt=\"\">";
                    if (_this.isBomb) {
                        eventCenter.trigger('correct_find');
                    }
                    eventCenter.trigger('flag_use', _this.x, _this.y);
                }
            },
            doubt: {
                nextState: 'blank',
                handler: function () {
                    _this.dom.innerHTML = "<img src=\"./img/ask.bmp\" alt=\"\">";
                    if (_this.isBomb) {
                        eventCenter.trigger('error_find');
                    }
                    eventCenter.trigger('flag_unuse');
                }
            }
        });
    };
    // 雷爆炸
    Block.prototype.exploade = function (id) {
        this.hasClicked = true;
        if (this.id === id) {
            this.dom.innerHTML = "<img src=\"./img/error.bmp\" alt=\"\">";
        }
        else {
            this.dom.innerHTML = "<img src=\"./img/blood.bmp\" alt=\"\">";
        }
    };
    /**
     * 展示此格子的值，如果此格子为空白点，则触发 ‘blank_expand’事件
     * @param x
     * @param y
     */
    Block.prototype.showPoint = function (x, y) {
        // 判断是自己或者是周围的点
        var isAroundOrSlef = (x === this.x || x === this.x + 1 || x === this.x - 1) &&
            (y === this.y || y === this.y + 1 || y === this.y - 1);
        if (isAroundOrSlef && !this.hasClicked) {
            this.dom.innerHTML = '<span class="point' + this.point + '">' + this.point + '</span>';
            // 他也是空白点，那么需要拓展开来
            if (this.point === 0) {
                this.hasClicked = true;
                var eventCenter = EventCenter_1.default();
                eventCenter.trigger('blank_expand', this.x, this.y);
            }
            else {
                this.hasClicked = true;
            }
        }
    };
    // 绑定事件
    Block.prototype.bindEvent = function () {
        var _this = this;
        this.dom = document.getElementById(this.id);
        // 左键点击
        this.dom.onclick = function () {
            if (_this.isBomb) {
                var eventCenter = EventCenter_1.default();
                eventCenter.trigger('bomb_exploded', _this.id);
            }
            else {
                _this.showPoint(_this.x, _this.y);
            }
        };
        // 右键点击
        this.dom.oncontextmenu = function (e) {
            stopPropagation_1.default(e);
            if (!_this.hasClicked) {
                _this.rightClickState.next();
            }
            return false;
        };
    };
    __decorate([
        log_1.default('fail'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Block.prototype, "exploade", null);
    return Block;
}(DOM_1.default));
exports.default = Block;
//# sourceMappingURL=Block.js.map