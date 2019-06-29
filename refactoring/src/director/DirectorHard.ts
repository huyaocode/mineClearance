import Director from './Director'

class DirectoHard extends Director {
  constructor() {
    super()
    this.config = {
      col: 16,
      row: 30,
      mineProbability: 0.15
    }
  }
}

export default DirectoHard
