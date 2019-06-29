import Director from './Director'

class DirectoHard extends Director {
  constructor() {
    super()
    this.config = {
      col: 15,
      row: 20,
      mineProbability: 0.15
    }
  }
}

export default DirectoHard
