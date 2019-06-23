import DOM from './DOM'
import stopBubble from '../util/stopPropagation'

class Block extends DOM {
  private isBoom: boolean

  constructor(isBoom: boolean, posX, posY) {
    super()
    this.isBoom = isBoom
    this.id = `block_${posX}_${posY}`
    setTimeout(() => this.bindEvent())
  }

  getHTMLStr(): string {
    return `<li id="${this.id}" class="block"></li>`
  }
  bindEvent() {
    document.getElementById(this.id).onclick = e => {
      stopBubble(e)
      console.log(this.id)
      return false
    }
    const _this = this
    document.getElementById(this.id).oncontextmenu = function(event) {
      stopBubble(event)
      return false
    }
    
  }
}

export default Block
