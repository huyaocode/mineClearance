import Director from './Director'

class DirectoGeneral extends Director {
  constructor() {
    super()
    this.config = {
      col: 10,
      row: 15,
      mineProbability: 0.12
    }
  }
}

export default DirectoGeneral
