import Build from './Build'
import MineAreaEasy from '../components/mineArea/MineAreaEasy'

class BuildEasy extends Build {
  public createMineArea(): number {
    const mineArea = new MineAreaEasy()
    this.mineClear.setMineArea(mineArea)
    return mineArea.mineNum
  }
}

export default BuildEasy
