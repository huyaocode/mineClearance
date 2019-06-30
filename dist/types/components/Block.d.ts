import DOM from './DOM';
declare class Block extends DOM {
    point: number;
    private isBomb;
    private x;
    private y;
    private hasClicked;
    private rightClickState;
    constructor(isBomb: boolean, posX: any, posY: any);
    getHTMLStr(): string;
    isbomb(): boolean;
    private listenEvent;
    private initState;
    private exploade;
    /**
     * 展示此格子的值，如果此格子为空白点，则触发 ‘blank_expand’事件
     * @param x
     * @param y
     */
    private showPoint;
    private bindEvent;
}
export default Block;
