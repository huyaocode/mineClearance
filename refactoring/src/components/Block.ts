import DOM from './DOM'
import stopBubble from '../util/stopPropagation'
import getEventCenter from '../util/EventCenter'
import StateMachine from '../util/StateMachine'

class Block extends DOM {
  public point: number = 0
  private isBomb: boolean
  private x: number
  private y: number
  private hasClicked: boolean = false
  private rightClickState: StateMachine

  constructor(isBomb: boolean, posX, posY) {
    super()
    this.isBomb = isBomb
    this.x = posX
    this.y = posY
    this.id = `block_${this.x}_${this.y}`
    this.listenEvent()
    this.initState()
    setTimeout(() => this.bindEvent())
  }

  // 初始化时获得其DOM字串
  public getHTMLStr(): string {
    return `<li id="${this.id}" class="block"></li>`
  }

  // 判断是否是雷
  public isbomb(): boolean {
    return this.isBomb
  }

  // 注册事件监听
  private listenEvent(): void {
    const eventCenter = getEventCenter()
    if (this.isBomb) {
      eventCenter.listen('bomb_exploded', this.exploade.bind(this))
    } else {
      eventCenter.listen('blank_expand', this.showPoint.bind(this))
      eventCenter.listen('bomb_exploded', () => {
        this.hasClicked = true
      })
    }
    // 当旗子用完了之后，标记为 ‘?’
    eventCenter.listen('flag_empty', (x, y) => {
      if (x === this.x && y === this.y) {
        this.rightClickState.next()
      }
    })
  }

  // 使用转态模式管理扫雷时右键点击时方块的样式改变
  private initState(): void {
    const eventCenter = getEventCenter()
    this.rightClickState = new StateMachine('blank', {
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
          if (this.isBomb) {
            eventCenter.trigger('correct_find')
          }
          eventCenter.trigger('flag_use', this.x, this.y)
        }
      },
      doubt: {
        nextState: 'blank',
        handler: () => {
          this.dom.innerHTML = `<img src="./img/ask.bmp" alt="">`
          if (this.isBomb) {
            eventCenter.trigger('error_find')
          }
          eventCenter.trigger('flag_unuse')
        }
      }
    })
  }

  // 雷爆炸
  private exploade(id): void {
    this.hasClicked = true
    if (this.id === id) {
      this.dom.innerHTML = `<img src="./img/error.bmp" alt="">`
    } else {
      this.dom.innerHTML = `<img src="./img/blood.bmp" alt="">`
    }
  }

  /**
   * 展示此格子的值，如果此格子为空白点，则触发 ‘blank_expand’事件
   * @param x
   * @param y
   */
  private showPoint(x, y) {
    // 判断是自己或者是周围的点
    const isAroundOrSlef =
      (x === this.x || x === this.x + 1 || x === this.x - 1) &&
      (y === this.y || y === this.y + 1 || y === this.y - 1)

    if (isAroundOrSlef && !this.hasClicked) {
      this.dom.innerHTML = '<span class="point' + this.point + '">' + this.point + '</span>'
      // 他也是空白点，那么需要拓展开来
      if (this.point === 0) {
        this.hasClicked = true
        const eventCenter = getEventCenter()
        eventCenter.trigger('blank_expand', this.x, this.y)
      } else {
        this.hasClicked = true
      }
    }
  }

  // 绑定事件
  private bindEvent() {
    this.dom = document.getElementById(this.id)
    // 左键点击
    this.dom.onclick = () => {
      if (this.isBomb) {
        const eventCenter = getEventCenter()
        eventCenter.trigger('bomb_exploded', this.id)
      } else {
        this.showPoint(this.x, this.y)
      }
    }
    // 右键点击
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
