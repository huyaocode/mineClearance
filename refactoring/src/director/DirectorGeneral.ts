import Director from './Director'
import BuildGeneral from '../Buider/BuildGeneral'

class DirectorGeneral extends Director {
  constructor() {
    super()
    this.build = new BuildGeneral()
  }
}

export default DirectorGeneral