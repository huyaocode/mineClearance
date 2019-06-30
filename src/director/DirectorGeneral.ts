import Director from './Director'
import config from '../config'

class DirectoGeneral extends Director {
  constructor() {
    super()
    this.config = config.general
  }
}

export default DirectoGeneral
