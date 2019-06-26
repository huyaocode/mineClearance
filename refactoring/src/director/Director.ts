import Build from '../Buider/Build'
import MineClear from '../MineClear'

abstract class Director {
  protected build: Build

  construct(appId: string) {
    this.build.createDifficultyPicker()
    this.build.createFace()
    this.build.createTimer()
    const mineNum = this.build.createMineArea()
    this.build.createFlagCounter(mineNum)
    this.build.renderMineClear(appId)
  }
}

export default Director
