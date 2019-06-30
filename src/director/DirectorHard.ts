import Director from './Director'
import config from '../config'

class DirectoHard extends Director {
  constructor() {
    super()
    this.config = config.hard
  }
}

export default DirectoHard
