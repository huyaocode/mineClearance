import MineClear from '../MineClear'
import Face from '../components/Face'
import FlagCounter from '../components/FlagCounter'
import Timer from '../components/Timer'
import DifficultyPicker from '../components/DifficultyPicker'
import MineArea from '../components/MineArea'

class Build {
  protected mineClear = new MineClear()

  public renderMineClear(appId: string) {
    const appDom: any = document.getElementById(appId)
    const str = this.getMineClearStr()
    appDom.innerHTML = str
  }

  getMineClearStr(): string {
    return `
    <div class="wrapper">
      <div class="head">
          <img src="./img/mine.ico" alt="">
          <h1>扫雷</h1>
      </div>
      <div class="menu">
        ${this.mineClear.getDifficultyPickerStr()}
      </div>
      <div class="main">
          <!-- 状态栏 -->
          <div class="state">
              ${this.mineClear.getFlagCounterStr()}
              ${this.mineClear.getFaceStr()}
              ${this.mineClear.getTimerStr()}
          </div>
          <!-- 雷区 -->
          ${this.mineClear.getMineAreaStr()}
      </div>
  </div>
    `
  }

  public createMineArea(config): number {
    const mineArea = new MineArea(config.col, config.row, config.mineProbability)
    this.mineClear.setMineArea(mineArea)
    return mineArea.mineNum
  }

  public createDifficultyPicker(): void {
    this.mineClear.setDifficultyPickerStr(new DifficultyPicker())
  }
  public createFace(): void {
    this.mineClear.setFace(new Face())
  }
  public createFlagCounter(minNum): void {
    this.mineClear.setFlagCounter(new FlagCounter(minNum))
  }
  public createTimer(): void {
    this.mineClear.setTimer(new Timer())
  }
}

export default Build
