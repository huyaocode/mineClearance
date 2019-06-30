import Build from '../Buider/Build'
import MineAreaConfig from './IMineAreaConfig'
import log from '../util/log'

class Director {
  protected build: Build
  protected config: MineAreaConfig

  constructor() {
    this.build = new Build()
  }

  @log('start')
  construct(appId: string) {
    this.build.createDifficultyPicker()
    this.build.createFace()
    this.build.createTimer()
    const mineNum = this.build.createMineArea(this.config)
    this.build.createFlagCounter(mineNum)
    this.build.createRackList()
    this.build.createAddRank()
    // 渲染
    this.build.renderMineClear(appId)
  }
}

export default Director
