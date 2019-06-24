import MineArea from './MineArea'

class MineAreaEasy extends MineArea {
  constructor() {
    super()
    this.col = 9
    this.row = 9
    this.mineProbability = 0.1
    this.createMineMap()
    this.setPoint()
  }
}

export default MineAreaEasy
