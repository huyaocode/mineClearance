import DOM from './DOM';
declare class DifficultyPicker extends DOM {
    difficultyMap: {
        Easy: string;
        General: string;
        Hard: string;
    };
    constructor();
    private bindEvent;
    private reStartGame;
    getHTMLStr(): string;
}
export default DifficultyPicker;
