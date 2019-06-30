/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

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

var DOM = /** @class */ (function () {
    function DOM() {
    }
    return DOM;
}());

var EventCenter = /** @class */ (function () {
    function EventCenter() {
        // 存储事件于其回调函数
        this.clientList = {};
    }
    // 监听事件，为事件名添加回调函数
    EventCenter.prototype.listen = function (eventName, callback) {
        if (!this.clientList[eventName]) {
            this.clientList[eventName] = [];
        }
        this.clientList[eventName].push(callback); // 订阅的消息添加进缓存列表
    };
    // 出发某事件，调用其所有的回调函数
    EventCenter.prototype.trigger = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var callbacks = this.clientList[eventName];
        if (!callbacks || callbacks.length === 0) {
            // 如果没有绑定对应的消息
            return false;
        }
        for (var i = 0, callback; (callback = callbacks[i++]);) {
            callback.apply(void 0, args);
        }
        return true;
    };
    // 为某个事件移除一个监听对象
    EventCenter.prototype.remove = function (eventName, callback) {
        var callbacks = this.clientList[eventName];
        if (!callbacks) {
            // 如果 eventName 对应的消息没有被人订阅，则直接返回
            return;
        }
        if (!callback) {
            // 如果没有传入具体的回调函数，表示需要取消 eventName 对应消息的所有订阅
            callbacks && (callbacks.length = 0);
        }
        else {
            for (var l = callbacks.length - 1; l >= 0; l--) {
                // 反向遍历订阅的回调函数列表
                var _callback = callbacks[l];
                if (_callback === callback) {
                    callbacks.splice(l, 1); // 删除订阅者的回调函数
                }
            }
        }
    };
    // 清空缓存
    EventCenter.prototype.clearAll = function () {
        this.clientList = {};
    };
    return EventCenter;
}());
// 返回单例
var getSingleEventCenter = (function () {
    var eventCenter;
    return function () {
        if (!eventCenter) {
            eventCenter = new EventCenter();
        }
        return eventCenter;
    };
})();

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
        var eventCenter = getSingleEventCenter();
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
            var eventCenter = getSingleEventCenter();
            eventCenter.clearAll();
            var director = classFactory("Director" + window['difficulty']);
            director.construct('app');
        }
        catch (e) {
            console.error(e);
        }
    };
    return Face;
}(DOM));

function getNumerHTMLStr(number) {
    var secondNums = ('000' + number).slice(-3).split('');
    return "\n        <img src=\"./img/d" + secondNums[0] + ".bmp\" alt=\"\">\n        <img src=\"./img/d" + secondNums[1] + ".bmp\" alt=\"\">\n        <img src=\"./img/d" + secondNums[2] + ".bmp\" alt=\"\">\n    ";
}

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
        return "\n      <div class=\"flagsNum\" id=\"flagcounter\">\n          " + getNumerHTMLStr(this.flagNum) + "\n      </div>\n    ";
    };
    FlagCounter.prototype.bindEvent = function () {
        var _this = this;
        this.dom = document.getElementById(this.id);
        var eventCenter = getSingleEventCenter();
        eventCenter.listen('setFlagNum', function (num) {
            _this.flagNum = num;
        });
        eventCenter.listen('flag_unuse', function () {
            _this.flagNum++;
            _this.dom.innerHTML = getNumerHTMLStr(_this.flagNum);
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
        var eventCenter = getSingleEventCenter();
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
        this.dom.innerHTML = getNumerHTMLStr(this.flagNum);
    };
    return FlagCounter;
}(DOM));

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
        return "\n      <div class=\"timer\" id=\"timer\">\n          " + getNumerHTMLStr(this.second) + "\n      </div>\n    ";
    };
    Timer.prototype.bindEvent = function () {
        this.dom = document.getElementById(this.id);
        var eventCenter = getSingleEventCenter();
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
        this.dom.innerHTML = getNumerHTMLStr(this.second);
    };
    return Timer;
}(DOM));

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
            var eventCenter = getSingleEventCenter();
            eventCenter.clearAll();
            var director = classFactory("Director" + difficulty);
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
}(DOM));

/**
 * 阻止时间冒泡
 * @param {*} event 事件
 */
function stopBubble(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
  return false
}

/**
 * 简单状态机
 */
var StateMachine = /** @class */ (function () {
    function StateMachine(curState, stateMap) {
        this.stateMap = stateMap;
        this.curState = curState;
    }
    StateMachine.prototype.next = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.curState = this.stateMap[this.curState].nextState;
        this.stateMap[this.curState].handler();
        return false;
    };
    return StateMachine;
}());

function getCurentTime() {
    var now = new Date();
    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日
    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    var clock = year + '-';
    if (month < 10)
        clock += '0';
    clock += month + '-';
    if (day < 10)
        clock += '0';
    clock += day + ' ';
    if (hh < 10)
        clock += '0';
    clock += hh + ':';
    if (mm < 10)
        clock += '0';
    clock += mm;
    return clock;
}

/**
 * 记录日志
 * @param type 日志名
 */
function log (type) {
    return function (target, propertyKey, descriptor) {
        var oldValue = descriptor.value;
        descriptor.value = function () {
            console.log(type + "  " + getCurentTime());
            return oldValue.apply(this, arguments);
        };
        return descriptor;
    };
}

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
        var eventCenter = getSingleEventCenter();
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
        var eventCenter = getSingleEventCenter();
        this.rightClickState = new StateMachine('blank', {
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
                var eventCenter = getSingleEventCenter();
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
                var eventCenter = getSingleEventCenter();
                eventCenter.trigger('bomb_exploded', _this.id);
            }
            else {
                _this.showPoint(_this.x, _this.y);
            }
        };
        // 右键点击
        this.dom.oncontextmenu = function (e) {
            stopBubble(e);
            if (!_this.hasClicked) {
                _this.rightClickState.next();
            }
            return false;
        };
    };
    __decorate([
        log('fail'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Block.prototype, "exploade", null);
    return Block;
}(DOM));

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
                this.blockMap[y].push(new Block(isMine, y, x));
            }
        }
        var eventCenter = getSingleEventCenter();
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
            var eventCenter = getSingleEventCenter();
            eventCenter.trigger('minearea_click');
        };
    };
    MineArea.prototype.getRandomByProbablity = function () {
        return Math.random() > 1 - this.mineProbability;
    };
    return MineArea;
}(DOM));

var config = {
    easy: {
        name: '简单',
        col: 6,
        row: 8,
        mineProbability: 0.1
    },
    general: {
        name: '普通',
        row: 18,
        col: 14,
        mineProbability: 0.12
    },
    hard: {
        name: '困难',
        col: 16,
        row: 30,
        mineProbability: 0.15
    },
    blockWidth: 25,
    blockHeight: 25
};

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
        var eventCenter = getSingleEventCenter();
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
        areaDom.innerHTML = "<div class=\"rank\" \n        style=\"width: " + config[window['difficulty'].toLowerCase()].row *
            config.blockWidth + "px; min-height: " + (config[window['difficulty'].toLowerCase()].col *
            config.blockHeight -
            20) + "px\"> \n      " + ranklistStr + " \n      </div>";
    };
    __decorate([
        log('rank'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RankList.prototype, "showRankList", null);
    return RankList;
}(DOM));

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
        var eventCenter = getSingleEventCenter();
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
        var curConfig = config[window['difficulty'].toLowerCase()];
        areaDom.innerHTML = "<div class=\"rank\" style=\"width: " + curConfig.row *
            config.blockWidth + "px; min-height: " + (curConfig.col * config.blockHeight - 20) + "px\"> \n          \u6A21\u5F0F\uFF1A" + curConfig.name + " <br>\n          \u626B\u96F7\u6570\uFF1A" + window['mineNum'] + "<br>\n          \u8017\u65F6\uFF1A" + window['palyTime'] + "\u79D2<br>\n          \u8BF7\u7559\u4E0B\u5927\u540D<br>\n          <input type=\"text\" id=\"playername\" name=\"playername\">\n          <br>\n          <button id=\"submit\">\u63D0\u4EA4</button>\n        </div>\n      ";
        document.getElementById('submit').onclick = function () {
            _this.pushToRankList(rankList);
            var eventCenter = getSingleEventCenter();
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
        log('win'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AddRank.prototype, "gameWin", null);
    return AddRank;
}(DOM));

var Build = /** @class */ (function () {
    function Build() {
        this.mineClear = new MineClear();
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
        var mineArea = new MineArea(config.col, config.row, config.mineProbability);
        this.mineClear.setMineArea(mineArea);
        return mineArea.mineNum;
    };
    Build.prototype.createDifficultyPicker = function () {
        this.mineClear.setDifficultyPickerStr(new DifficultyPicker());
    };
    Build.prototype.createFace = function () {
        this.mineClear.setFace(new Face());
    };
    Build.prototype.createFlagCounter = function (minNum) {
        this.mineClear.setFlagCounter(new FlagCounter(minNum));
    };
    Build.prototype.createTimer = function () {
        this.mineClear.setTimer(new Timer());
    };
    Build.prototype.createRackList = function () {
        this.mineClear.setRankList(new RankList());
    };
    Build.prototype.createAddRank = function () {
        this.mineClear.setAddRank(new AddRank());
    };
    return Build;
}());

var Director = /** @class */ (function () {
    function Director() {
        this.build = new Build();
    }
    Director.prototype.construct = function (appId) {
        this.build.createDifficultyPicker();
        this.build.createFace();
        this.build.createTimer();
        var mineNum = this.build.createMineArea(this.config);
        this.build.createFlagCounter(mineNum);
        this.build.createRackList();
        this.build.createAddRank();
        // 渲染
        this.build.renderMineClear(appId);
    };
    __decorate([
        log('start'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], Director.prototype, "construct", null);
    return Director;
}());

var DirectorEasy = /** @class */ (function (_super) {
    __extends(DirectorEasy, _super);
    function DirectorEasy() {
        var _this = _super.call(this) || this;
        _this.config = config.easy;
        return _this;
    }
    return DirectorEasy;
}(Director));

var DirectoGeneral = /** @class */ (function (_super) {
    __extends(DirectoGeneral, _super);
    function DirectoGeneral() {
        var _this = _super.call(this) || this;
        _this.config = config.general;
        return _this;
    }
    return DirectoGeneral;
}(Director));

var DirectoHard = /** @class */ (function (_super) {
    __extends(DirectoHard, _super);
    function DirectoHard() {
        var _this = _super.call(this) || this;
        _this.config = config.hard;
        return _this;
    }
    return DirectoHard;
}(Director));

var classMap = {
    DirectorEasy: DirectorEasy,
    DirectorGeneral: DirectoGeneral,
    DirectorHard: DirectoHard
};

var classFactory = (function (className) {
    if (className in classMap) {
        return new classMap[className]();
    }
    else {
        throw TypeError('no this class: ' + className);
    }
});

var initDifficulty = 'Easy';
try {
    window['difficulty'] = initDifficulty;
    var director = classFactory("Director" + initDifficulty);
    director.construct('app');
}
catch (e) {
    console.error(e);
}
//# sourceMappingURL=refactory-mineclear.es5.js.map
