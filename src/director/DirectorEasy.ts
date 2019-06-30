import Director from './Director'
import config from '../config'

class DirectorEasy extends Director {
  constructor() {
    super()
    this.config = config.easy
  }
}

export default DirectorEasy
