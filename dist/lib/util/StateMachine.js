"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = StateMachine;
//# sourceMappingURL=StateMachine.js.map