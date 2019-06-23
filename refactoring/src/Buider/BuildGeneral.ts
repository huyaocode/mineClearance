import Build from './Build'
import MineAreaGeneral from '../components/mineArea/MineAreaGeneral';

class BuildGeneral extends Build {

  public createMineArea(): void {
    this.mineClear.setMineArea(new MineAreaGeneral())
  }
}

export default BuildGeneral