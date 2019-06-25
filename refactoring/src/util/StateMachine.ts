interface StateMap {
  [propName: string]: {
    nextState: any
    handler: Function
  }
}
/**
 * 简单状态机
 */
class StateMachine {
  stateMap: StateMap
  curState
  constructor(stateMap: StateMap, curState) {
    this.stateMap = stateMap
    this.curState = curState
  }
  next(...args) {
    this.curState = this.stateMap[this.curState].nextState
    this.stateMap[this.curState].handler()
    return false
  }
}

export default StateMachine
