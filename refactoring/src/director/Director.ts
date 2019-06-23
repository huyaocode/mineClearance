import Build from '../Buider/Build'
import MineClear from '../MineClear'

abstract class Director {
  protected build: Build

  construct(appId: string) {
    this.build.createDifficultyPicker()
    this.build.createFace()
    this.build.createFlagCounter()
    this.build.createTimer()
    this.build.createMineArea()

    this.build.renderMineClear(appId)
  }
}

export default Director
