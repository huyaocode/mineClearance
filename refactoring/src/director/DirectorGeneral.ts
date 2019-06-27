import Director from './Director'

class DirectorGeneral extends Director {
  constructor() {
    super()
    this.config = {
      col: 10,
      row: 15,
      mineProbability: 0.15
    }
  }
}

export default DirectorGeneral
