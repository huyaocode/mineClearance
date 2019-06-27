import Face from './components/Face'
import FlagCounter from './components/FlagCounter'
import Timer from './components/Timer'
import MineArea from './components/MineArea'
import DifficultyPicker from './components/DifficultyPicker'

class MineClear {
  $el: any

  difficultyPicker: DifficultyPicker
  face: Face
  timer: Timer
  flagCounter: FlagCounter
  mineArea: MineArea

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
}

export default MineClear
