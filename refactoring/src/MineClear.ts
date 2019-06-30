import Face from './components/Face'
import FlagCounter from './components/FlagCounter'
import Timer from './components/Timer'
import MineArea from './components/MineArea'
import DifficultyPicker from './components/DifficultyPicker'
import RankList from './components/RackList'
import AddRank from './components/GameWin'

class MineClear {
  $el: any

  difficultyPicker: DifficultyPicker
  face: Face
  timer: Timer
  flagCounter: FlagCounter
  mineArea: MineArea
  rankList: RankList
  addRank: AddRank

  setDifficultyPickerStr(difficultyPicker: DifficultyPicker) {
    this.difficultyPicker = difficultyPicker
  }
  getDifficultyPickerStr() {
    return this.difficultyPicker.getHTMLStr()
  }

  setFace(face: Face): void {
    this.face = face
  }
  getFaceStr(): string {
    return this.face.getHTMLStr()
  }

  setTimer(timer: Timer): void {
    this.timer = timer
  }
  getTimerStr(): string {
    return this.timer.getHTMLStr()
  }

  setFlagCounter(flagCounter: FlagCounter): void {
    this.flagCounter = flagCounter
  }
  getFlagCounterStr(): string {
    return this.flagCounter.getHTMLStr()
  }

  setMineArea(mineArea: MineArea): void {
    this.mineArea = mineArea
  }
  getMineAreaStr(): string {
    return this.mineArea.getHTMLStr()
  }

  setRankList(rankList: RankList): void {
    this.rankList = rankList
  }
  getRankList(): string {
    return this.rankList.getHTMLStr()
  }

  setAddRank(rankList: AddRank): void {
    this.addRank = rankList
  }
  getAddRank(): string {
    return this.rankList.getHTMLStr()
  }
}

export default MineClear
