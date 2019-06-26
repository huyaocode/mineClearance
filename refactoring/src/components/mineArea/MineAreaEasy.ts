import MineArea from './MineArea'

class MineAreaEasy extends MineArea {
  constructor() {
    super()
    this.col = 15
    this.row = 30
    this.mineProbability = 0.1
    this.createMineMap()
    this.setPoint()
    setTimeout(() => this.bindEvent())
  }
}

export default MineAreaEasy
