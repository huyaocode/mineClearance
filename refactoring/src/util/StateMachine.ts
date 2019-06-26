interface StateMap {
  [propName: string]: {
    nextState: string
    handler: Function
  }
}
/**
 * 简单状态机
 */
class StateMachine {
  stateMap: StateMap
  curState
  constructor(curState: string, stateMap: StateMap) {
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
