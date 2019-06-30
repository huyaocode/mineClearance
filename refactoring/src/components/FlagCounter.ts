import DOM from './DOM'
import getEventCenter from '../util/EventCenter'
import getNumberHTMLStr from '../util/getNumberHTMLStr'

class FlagCounter extends DOM {
  private flagNum: number = 0
  private mineNum: number = 0
  private correctFind: number = 0
  constructor(mineNum) {
    super()
    this.id = 'flagcounter'
    this.flagNum = this.mineNum = mineNum
    setTimeout(() => {
      this.bindEvent()
    })
  }

  public getHTMLStr(): string {
    return `
      <div class="flagsNum" id="flagcounter">
          ${getNumberHTMLStr(this.flagNum)}
      </div>
    `
  }

  private bindEvent() {
    this.dom = document.getElementById(this.id)

    const eventCenter = getEventCenter()

    eventCenter.listen('setFlagNum', num => {
      this.flagNum = num
    })

    eventCenter.listen('flag_unuse', () => {
      this.flagNum++
      this.dom.innerHTML = getNumberHTMLStr(this.flagNum)
    })

    eventCenter.listen('flag_use', this.useFlag.bind(this))

    eventCenter.listen('correct_find', () => {
      this.correctFind++
    })

    eventCenter.listen('error_find', () => {
      this.correctFind--
    })
  }

  private useFlag(x, y) {
    const eventCenter = getEventCenter()
    this.flagNum--
    if (this.flagNum < 0) {
      eventCenter.trigger('flag_empty', x, y)
      return
    } else if (this.flagNum == 0) {
      if (this.correctFind === this.mineNum) {
        eventCenter.trigger('game_win')
      }
    }
    this.dom.innerHTML = getNumberHTMLStr(this.flagNum)
  }
}

export default FlagCounter
