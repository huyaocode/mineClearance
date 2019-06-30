import DOM from './DOM';
declare class FlagCounter extends DOM {
    private flagNum;
    private mineNum;
    private correctFind;
    constructor(mineNum: any);
    getHTMLStr(): string;
    private bindEvent;
    private useFlag;
}
export default FlagCounter;
