"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCurentTime_1 = require("./getCurentTime");
/**
 * 记录日志
 * @param type 日志名
 */
function default_1(type) {
    return function (target, propertyKey, descriptor) {
        var oldValue = descriptor.value;
        descriptor.value = function () {
            console.log(type + "  " + getCurentTime_1.default());
            return oldValue.apply(this, arguments);
        };
        return descriptor;
    };
}
exports.default = default_1;
//# sourceMappingURL=log.js.map