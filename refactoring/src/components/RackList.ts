import DOM from './DOM'
import getEventCenter from '../util/EventCenter'
import config from '../config'

class RankList extends DOM {
  areaHeight: number
  areaWidth: number
  constructor() {
    super()
    this.id = 'rank'
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
    const eventCenter = getEventCenter()

    this.dom.onclick = () => {
      this.showRankList()
    }
    eventCenter.listen('showRankList', () => {
      this.showRankList()
    })
  }

  getRackList(): Array<any> {
    var rankStr = localStorage.getItem('rank' + window['difficulty'])
    var rankList = []
    if (rankStr) {
      rankList = JSON.parse(rankStr)
    }
    return rankList
  }

  showRankList() {
    const rankList = this.getRackList()
    const areaDom = document.getElementById('minearea')

    var ranklistStr = `
      <table border="1" cellspacing="0">
        <tr>
          <th>姓名</th>
          <th>耗時</th>
        </tr>
        <tr>
    `
    for (var i = 0; i < rankList.length; i++) {
      ranklistStr += `
        <td>${rankList[i].name}</td> 
        <td>${rankList[i].time}</td>
      `
    }
    ranklistStr + '</tr></table>'

    areaDom.innerHTML = `<div class="rank" 
        style="width: ${config[window['difficulty'].toLowerCase()].row *
          config.blockWidth}px; min-height: ${config[window['difficulty'].toLowerCase()].col *
      config.blockHeight -
      20}px"> 
      ${ranklistStr} 
      </div>`
  }
}

export default RankList
