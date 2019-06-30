"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNumerHTMLStr(number) {
    var secondNums = ('000' + number).slice(-3).split('');
    return "\n        <img src=\"./img/d" + secondNums[0] + ".bmp\" alt=\"\">\n        <img src=\"./img/d" + secondNums[1] + ".bmp\" alt=\"\">\n        <img src=\"./img/d" + secondNums[2] + ".bmp\" alt=\"\">\n    ";
}
exports.default = getNumerHTMLStr;
//# sourceMappingURL=getNumberHTMLStr.js.map