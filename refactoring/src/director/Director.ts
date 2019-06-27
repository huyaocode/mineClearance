import Build from '../Buider/Build'
import MineAreaConfig from './IMineAreaConfig'

abstract class Director {
  protected build: Build
  protected config: MineAreaConfig

  constructor() {
    this.build = new Build()
  }

  construct(appId: string) {
    console.log('this.build', this.build)
    this.build.createDifficultyPicker()
    this.build.createFace()
    this.build.createTimer()
    const mineNum = this.build.createMineArea(this.config)
    this.build.createFlagCounter(mineNum)
    this.build.renderMineClear(appId)
  }
}

export default Director
