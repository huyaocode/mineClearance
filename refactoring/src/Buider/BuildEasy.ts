import Build from './Build'
import MineAreaEasy from '../components/mineArea/MineAreaEasy';

class BuildEasy extends Build {

  public createMineArea(): void {
    this.mineClear.setMineArea(new MineAreaEasy())
  }
}

export default BuildEasy