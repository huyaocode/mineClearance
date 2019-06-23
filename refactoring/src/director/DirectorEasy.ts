import Director from './Director'
import BuildEasy from '../Buider/BuildEasy'

class DirectorEasy extends Director {
  constructor() {
    super()
    this.build = new BuildEasy()
  }
}

export default DirectorEasy
