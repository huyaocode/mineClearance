import DOM from './DOM'
import stopBubble from '../util/stopPropagation'
import getEventCenter from '../util/EventCenter'
import StateMachine from '../util/StateMachine'

class Block extends DOM {
  private isBomb: boolean
  point: number = 0
  private x: number
  private y: number
  private hasClicked: boolean = false
  private rightClickState: StateMachine

  constructor(isBomb: boolean, posX, posY) {
    super()
    this.isBomb = isBomb
    this.x = posX
    this.y = posY
    this.id = `block_${posX}_${posY}`
    setTimeout(() => this.bindEvent())
    const eventCenter = getEventCenter()
    if (this.isBomb) {
      eventCenter.listen('bomb_exploded', this.exploade.bind(this))
    } else {
      eventCenter.listen('blank_expand', this.showPoint.bind(this))
    }
    this.initState()
  }
  initState() {
    const eventCenter = getEventCenter()
    this.rightClickState = new StateMachine(
      {
        blank: {
          nextState: 'flag',
          handler: () => {
            this.dom.innerHTML = ``
          }
        },
        flag: {
          nextState: 'doubt',
          handler: () => {
            this.dom.innerHTML = `<img src="./img/flag.bmp" alt="">`
            eventCenter.trigger('use_flag')
          }
        },
        doubt: {
          nextState: 'blank',
          handler: () => {
            this.dom.innerHTML = `<img src="./img/ask.bmp" alt="">`
            eventCenter.trigger('unuse_flag')
          }
        }
      },
      'blank'
    )
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
  /**
   * 展示点的值
   * @param x
   * @param y
   */
  showPoint(x, y) {
    // 判断是自己或者是周围的点
    const isAroundOrSlef =
      (x === this.x || x === this.x + 1 || x === this.x - 1) &&
      (y === this.y || y === this.y + 1 || y === this.y - 1)

    if (isAroundOrSlef) {
      this.dom.innerHTML = '<span class="point' + this.point + '">' + this.point + '</span>'
      // 他也是空白点，那么需要拓展开来
      if (this.point === 0 && !this.hasClicked) {
        this.hasClicked = true
        const eventCenter = getEventCenter()
        eventCenter.trigger('blank_expand', this.x, this.y)
      } else {
        this.hasClicked = true
      }
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
      } else {
        this.showPoint(this.x, this.y)
      }
    }
    this.dom.oncontextmenu = e => {
      stopBubble(e)
      if (!this.hasClicked) {
        this.rightClickState.next()
      }
      return false
    }
  }
}

export default Block
