import MineArea from './MineArea'
import Block from '../Block'

class MineAreaEasy extends MineArea {
  constructor() {
    super()
    this.col = 9
    this.row = 9
    this.createMineMap()
  }

  createMineMap(): void {
    this.blockMap = []
    //y 为纵向坐标
    for (let y = 0; y < this.col; y++) {
      this.blockMap[y] = []
      //x 为横向坐标
      for (let x = 0; x < this.row; x++) {
        this.blockMap[y].push(new Block(false, y, x))
      }
    }
  }

  public getHTMLStr(): string {
    let htmlStr = ''
    htmlStr += `
    <div class="mines"> <ul class="col">`

    for (let y = 0; y < this.col; y++) {
      htmlStr += `<li><ul class="row">`

      for (let x = 0; x < this.row; x++) {
        htmlStr += this.blockMap[y][x].getHTMLStr()
      }

      htmlStr += `</ul> </li>`
    }
    htmlStr += `</ul> </div>`
    return htmlStr
  }
}

export default MineAreaEasy
