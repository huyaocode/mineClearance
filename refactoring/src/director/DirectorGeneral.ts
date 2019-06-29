import Director from './Director'

class DirectoGeneral extends Director {
  constructor() {
    super()
    this.config = {
      row: 18,
      col: 14,
      mineProbability: 0.12
    }
  }
}

export default DirectoGeneral
