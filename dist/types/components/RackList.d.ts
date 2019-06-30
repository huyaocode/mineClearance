import DOM from './DOM';
declare class RankList extends DOM {
    areaHeight: number;
    areaWidth: number;
    constructor();
    getHTMLStr(): string;
    bindEvent(): any;
    getRackList(): Array<any>;
    showRankList(): void;
}
export default RankList;
