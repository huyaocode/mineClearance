import DOM from './DOM';
declare class Timer extends DOM {
    private timer;
    private second;
    constructor();
    getHTMLStr(): string;
    private bindEvent;
    private startTimer;
    private endTimer;
    private secondAdd;
}
export default Timer;
