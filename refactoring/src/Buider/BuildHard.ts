import Build from './Build'
import MineAreaHard from '../components/mineArea/MineAreaHard';

class BuildHard extends Build {

  public createMineArea(): void {
    this.mineClear.setMineArea(new MineAreaHard())
  }
}

export default BuildHard