declare abstract class DOM {
    protected htmlStr: string;
    protected dom: any;
    protected id: string;
    abstract getHTMLStr(): string;
}
export default DOM;
