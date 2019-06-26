import DOM from './DOM'
import getEventCenter from '../util/EventCenter'
import getNumberHTMLStr from '../util/getNumberHTMLStr'

class FlagCounter extends DOM {
  private flagNum: number = 0

  constructor(mineNum) {
    super()
    this.id = 'flagcounter'
    this.flagNum = mineNum
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
  }

  private useFlag(x, y) {
    const eventCenter = getEventCenter()
    this.flagNum--
    if (this.flagNum < 0) {
      alert('旗子用完了')
      eventCenter.trigger('flag_empty', x, y)
      return
    }
    this.dom.innerHTML = getNumberHTMLStr(this.flagNum)
  }
}

export default FlagCounter
