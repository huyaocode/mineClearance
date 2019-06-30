import MineClear from '../MineClear';
declare class Build {
    protected mineClear: MineClear;
    renderMineClear(appId: string): void;
    getMineClearStr(): string;
    createMineArea(config: any): number;
    createDifficultyPicker(): void;
    createFace(): void;
    createFlagCounter(minNum: any): void;
    createTimer(): void;
    createRackList(): void;
    createAddRank(): void;
}
export default Build;
