import DOM from './DOM'
import getEventCenter from '../util/EventCenter'
import classFactory from '../ClassFactory'

const faceImg = {
  smile: `<img src="./img/face_normal.bmp" alt="">`,
  cry: `<img src="./img/face_fail.bmp" alt="">`
}

class Face extends DOM {
  constructor() {
    super()
    this.id = 'face'
    setTimeout(() => {
      this.bindEvent()
    })
  }

  getHTMLStr(): string {
    return `
      <div class="face" id="face">
        ${faceImg.smile}
      </div>
    `
  }

  bindEvent(): any {
    this.dom = document.getElementById(this.id)
    this.dom.onclick = () => {
      this.reStartGame()
    }
    const eventCenter = getEventCenter()
    eventCenter.listen('bomb_exploded', this.cryFace.bind(this))
  }

  cryFace(): any {
    this.dom.innerHTML = faceImg.cry
  }

  /**
   * 使用反射，重新构建APP
   */
  reStartGame(): void {
    try {
      const eventCenter = getEventCenter()
      eventCenter.clearAll()
      const director = classFactory(`Director${window['difficulty']}`)
      director.construct('app')
    } catch (e) {
      console.error(e)
    }
  }
}
export default Face
