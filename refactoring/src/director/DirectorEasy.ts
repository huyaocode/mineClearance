import Director from './Director'

class DirectorEasy extends Director {
  constructor() {
    super()
    this.config = {
      col: 6,
      row: 8,
      mineProbability: 0.1
    }
  }
}

export default DirectorEasy
