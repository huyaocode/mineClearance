import DOM from './DOM'
import stopBubble from '../util/stopPropagation'
import getEventCenter from '../util/EventCenter'

class Block extends DOM {
  private isBomb: boolean
  point: number = 0

  constructor(isBomb: boolean, posX, posY) {
    super()
    this.isBomb = isBomb
    this.id = `block_${posX}_${posY}`
    setTimeout(() => this.bindEvent())
    if (this.isBomb) {
      const eventCenter = getEventCenter()
      eventCenter.listen('bomb_exploded', this.exploade.bind(this))
    }
  }
  isbomb() {
    return this.isBomb
  }
  exploade(id) {
    if (this.id === id) {
      this.dom.innerHTML = `<img src="./img/error.bmp" alt="">`
    } else {
      this.dom.innerHTML = `<img src="./img/blood.bmp" alt="">`
    }
  }

  getHTMLStr(): string {
    return `<li id="${this.id}" class="block"></li>`
  }

  bindEvent() {
    this.dom = document.getElementById(this.id)
    this.dom.onclick = () => {
      if (this.isBomb) {
        const eventCenter = getEventCenter()
        eventCenter.trigger('bomb_exploded', this.id)
      }
    }
    this.dom.oncontextmenu = e => {
      stopBubble(e)
      return false
    }
  }
}

export default Block
