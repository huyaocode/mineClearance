import MineArea from './MineArea'

class MineAreaHard extends MineArea {
  constructor() {
    super()
    this.col = 30
    this.row = 15
    this.mineProbability = 0.1
    this.createMineMap()
    this.setPoint()
  }
}

export default MineAreaHard
