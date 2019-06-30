import DOM from './DOM';
declare class AddRank extends DOM {
    areaHeight: number;
    areaWidth: number;
    rankLen: number;
    constructor();
    getHTMLStr(): string;
    bindEvent(): any;
    getRackList(): Array<any>;
    gameWin(): void;
    /**
     * 写入前十排行榜
     * @param rankList
     */
    AddToRank(rankList: any): void;
    pushToRankList(rankList: any): void;
}
export default AddRank;
