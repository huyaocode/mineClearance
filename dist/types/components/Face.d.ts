import DOM from './DOM';
declare class Face extends DOM {
    constructor();
    getHTMLStr(): string;
    bindEvent(): any;
    cryFace(): any;
    /**
     * 使用反射，重新构建APP
     */
    reStartGame(): void;
}
export default Face;
