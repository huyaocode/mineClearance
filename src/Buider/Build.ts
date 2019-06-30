import MineClear from '../MineClear'
import Face from '../components/Face'
import FlagCounter from '../components/FlagCounter'
import Timer from '../components/Timer'
import DifficultyPicker from '../components/DifficultyPicker'
import MineArea from '../components/MineArea'
import RankList from '../components/RackList'
import AddRank from '../components/GameWin'

class Build {
  public mineClear = new MineClear()

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
  public createRackList(): void {
    this.mineClear.setRankList(new RankList())
  }
  public createAddRank(): void {
    this.mineClear.setAddRank(new AddRank())
  }
}

export default Build
