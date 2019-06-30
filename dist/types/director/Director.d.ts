import Build from '../Buider/Build';
import MineAreaConfig from './IMineAreaConfig';
declare class Director {
    protected build: Build;
    protected config: MineAreaConfig;
    constructor();
    construct(appId: string): void;
}
export default Director;
