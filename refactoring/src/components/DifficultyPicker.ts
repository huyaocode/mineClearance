import DOM from './DOM'
import classFactory from '../ClassFactory'
import getEventCenter from '../util/EventCenter'

class DifficultyPicker extends DOM {
  difficultyMap = {
    Easy: '简单',
    General: '普通',
    Hard: '困难'
  }
  constructor() {
    super()
    this.id = 'difficulty'
    setTimeout(() => {
      this.bindEvent()
    })
  }

  private bindEvent(): any {
    this.dom = document.getElementById(this.id)
    document.getElementById(this.id).onclick = e => {
      if ((<any>e.target).value != undefined) {
        this.reStartGame((<any>e.target).value)
      }
    }
  }

  private reStartGame(difficulty: string) {
    try {
      const eventCenter = getEventCenter()
      eventCenter.clearAll()
      const director = classFactory(`Director${difficulty}`)
      window['difficulty'] = difficulty
      director.construct('app')
    } catch (e) {
      console.error(e)
    }
  }

  getHTMLStr(): string {
    const difficulty = window['difficulty']
    return `
      <div class="option">
        <span>难度: </span>
        <span>${this.difficultyMap[difficulty]}</span>
        <ul class="difficul" id="difficulty">
            <li><label><input name="difficultyopt" type="radio" value="Easy" ${difficulty ==
              'Easy' && 'checked'}/><span></span>${this.difficultyMap.Easy}</label></li>
            <li><label><input name="difficultyopt" type="radio" value="General" ${difficulty ==
              'General' && 'checked'}/><span></span>${this.difficultyMap.General}</label></li>
            <li><label><input name="difficultyopt" type="radio" value="Hard" ${difficulty ==
              'Hard' && 'checked'}/><span></span>${this.difficultyMap.Hard}</label></li>
        </ul>
      </div>
    `
  }
}

export default DifficultyPicker
