import DOM from './DOM';
declare class MineArea extends DOM {
    mineNum: number;
    protected row: number;
    protected col: number;
    protected mineProbability: number;
    private blockMap;
    constructor(col: any, row: any, mineProbability: any);
    getHTMLStr(): string;
    protected createMineMap(): void;
    protected setPoint(): void;
    protected bindEvent(): void;
    private getRandomByProbablity;
}
export default MineArea;
