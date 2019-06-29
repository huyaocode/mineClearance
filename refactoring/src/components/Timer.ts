import DOM from './DOM'
import getEventCenter from '../util/EventCenter'
import getNumberHTMLStr from '../util/getNumberHTMLStr'

class Timer extends DOM {
  private timer = null
  private second: number = 0
  constructor() {
    super()
    this.id = 'timer'
    setTimeout(() => {
      this.bindEvent()
    })
  }

  public getHTMLStr(): string {
    return `
      <div class="timer" id="timer">
          ${getNumberHTMLStr(this.second)}
      </div>
    `
  }

  private bindEvent() {
    this.dom = document.getElementById(this.id)

    const eventCenter = getEventCenter()
    eventCenter.listen('bomb_exploded', this.endTimer.bind(this))
    eventCenter.listen('game_win', this.endTimer.bind(this))
    eventCenter.listen('minearea_click', this.startTimer.bind(this))
  }

  private startTimer() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.secondAdd()
      }, 1000)
    }
  }

  private endTimer() {
    clearInterval(this.timer)
  }

  private secondAdd(): void {
    this.second++
    window['palyTime'] = this.second
    this.dom.innerHTML = getNumberHTMLStr(this.second)
  }
}

export default Timer
