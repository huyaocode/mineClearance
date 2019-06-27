import Director from './Director'

class DirectorGeneral extends Director {
  constructor() {
    super()
    this.config = {
      col: 20,
      row: 25,
      mineProbability: 0.2
    }
  }
}

export default DirectorGeneral
