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
    this.renderMineClear(appId)
  }

  renderMineClear(appId: string) {
    const appDom: any = document.getElementById(appId)
    const str = this.getMineClearStr()
    appDom.innerHTML = str
  }

  getMineClearStr() {
    const mineClear = this.build.mineClear
    return `
      <div class="wrapper">
        <div class="head">
            <img src="./img/mine.ico" alt="">
            <h1>扫雷</h1>
        </div>
        <div class="menu">
          ${mineClear.getDifficultyPickerStr()}
          ${mineClear.getRankList()}
        </div>
        <div class="main">
            <!-- 状态栏 -->
            <div class="state">
                ${mineClear.getFlagCounterStr()}
                ${mineClear.getFaceStr()}
                ${mineClear.getTimerStr()}
            </div>
            <!-- 雷区 -->
            ${mineClear.getMineAreaStr()}
        </div>
    </div>
    `
  }
}

export default Director
