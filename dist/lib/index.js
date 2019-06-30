"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassFactory_1 = require("./ClassFactory");
var initDifficulty = 'Easy';
try {
    window['difficulty'] = initDifficulty;
    var director = ClassFactory_1.default("Director" + initDifficulty);
    director.construct('app');
}
catch (e) {
    console.error(e);
}
/**
 * TODO
 *
 * 当旗子用完自动变成 '?'
 * 展示难度
 */
//# sourceMappingURL=index.js.map