import DOM from '../DOM'
import Block from '../Block'

abstract class MineArea extends DOM {
  protected row: number
  protected col: number
  protected mineProbability: number

  private blockMap: Array<Array<Block>>

  public mineNum: number = 0

  createMineMap(): void {
    this.blockMap = []
    //y 为纵向坐标
    for (let y = 0; y < this.col; y++) {
      this.blockMap[y] = []
      //x 为横向坐标
      for (let x = 0; x < this.row; x++) {
        const isMine = this.getRandomByProbablity()
        isMine && this.mineNum++
        this.blockMap[y].push(new Block(isMine, y, x))
      }
    }
  }

  getRandomByProbablity(): boolean {
    return Math.random() > 1 - this.mineProbability
  }

  setPoint() {
    const map = this.blockMap
    for (let y = 0; y < this.col; y++) {
      for (let x = 0; x < this.row; x++) {
        if (map[y][x].isbomb()) {
          if (y > 0 && !map[y - 1][x].isbomb()) {
            map[y - 1][x].point++ //上方
          }
          if (y < this.col - 1 && !map[y + 1][x].isbomb()) {
            map[y + 1][x].point++ //下方
          }
          if (x > 0 && !map[y][x - 1].isbomb()) {
            map[y][x - 1].point++ //左方
          }
          if (x < this.row - 1 && map[y][x + 1].isbomb()) {
            map[y][x + 1].point++ //右方
          }
          if (x > 0 && y > 0 && !map[y - 1][x - 1].isbomb()) {
            map[y - 1][x - 1].point++ //左上方
          }
          if (x < this.row - 1 && y > 0 && !map[y - 1][x + 1].isbomb()) {
            map[y - 1][x + 1].point++ // 右上方
          }
          if (x > 0 && y < this.col - 1 && !map[y + 1][x - 1].isbomb()) {
            map[y + 1][x - 1].point++ //左下方
          }
          if (x < this.row - 1 && y < this.col - 1 && !map[y + 1][x + 1].isbomb()) {
            map[y + 1][x + 1].point++ //右下方
          }
        }
      }
    }
    console.log(this.blockMap)
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

export default MineArea
