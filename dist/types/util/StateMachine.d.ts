interface StateMap {
    [propName: string]: {
        nextState: string;
        handler: Function;
    };
}
/**
 * 简单状态机
 */
declare class StateMachine {
    stateMap: StateMap;
    curState: any;
    constructor(curState: string, stateMap: StateMap);
    next(...args: any[]): boolean;
}
export default StateMachine;
