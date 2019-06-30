"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classMap_1 = require("./classMap");
exports.default = (function (className) {
    if (className in classMap_1.default) {
        return new classMap_1.default[className]();
    }
    else {
        throw TypeError('no this class: ' + className);
    }
});
//# sourceMappingURL=index.js.map