import DOM from './DOM'
import getEventCenter from '../util/EventCenter'
import config from '../config'

class AddRank extends DOM {
  areaHeight: number
  areaWidth: number
  rankLen: number = 10
  constructor() {
    super()
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
    eventCenter.listen('game_win', () => {
      this.showAddRank()
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

  showAddRank() {
    let rankList = this.getRackList()
    const areaDom = document.getElementById('minearea')
    const curConfig = config[window['difficulty'].toLowerCase()]
    // 少于10人或超过10人但超过最后一名
    if (
      rankList.length < this.rankLen ||
      (rankList.length >= this.rankLen && window['palyTime'] < rankList[this.rankLen - 1].time)
    ) {
      areaDom.innerHTML = `<div class="rank" style="width: ${curConfig.row *
        config.blockWidth}px; min-height: ${curConfig.col * config.blockHeight - 20}px"> 
            模式：${curConfig.name} <br>
            扫雷数：${window['mineNum']}<br>
            耗时：${window['palyTime']}秒<br>
            请留下大名<br>
            <input type="text" id="playername" name="playername">
            <br>
            <button id="submit">提交</button>
          </div>
        `
      document.getElementById('submit').onclick = () => {
        this.pushToRankList(rankList)
        const eventCenter = getEventCenter()
        eventCenter.trigger('showRankList')
      }
    } else {
      alert('游戏胜利')
    }
  }

  pushToRankList(rankList) {
    var name = (<any>document.getElementById('playername')).value
    rankList.push({
      name: name,
      time: window['palyTime']
    })
    rankList.sort((a, b) => {
      return <any>a.time - <any>b.time
    })
    rankList = rankList.slice(0, 10)
    console.log(rankList)
    localStorage.setItem('rank' + window['difficulty'], JSON.stringify(rankList))
  }
}

export default AddRank
