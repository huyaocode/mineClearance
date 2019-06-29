import DOM from './DOM'
import getEventCenter from '../util/EventCenter'

class RankList extends DOM {
  constructor() {
    super()
    this.id = 'face'
    setTimeout(() => {
      this.bindEvent()
    })
  }

  getHTMLStr(): string {
    return `
        <div class="option" id="rank">
            排行榜
        </div>
    `
  }

  bindEvent(): any {
    this.dom = document.getElementById(this.id)
  }
}

export default RankList
