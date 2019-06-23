import DOM from './DOM'

class FlagCounter extends DOM {
  getHTMLStr(): string {
    return `
      <div class="flagsNum">
          <img src="./img/d0.bmp" alt="">
          <img src="./img/d9.bmp" alt="">
          <img src="./img/d9.bmp" alt="">
      </div>
    `
  }
}
export default FlagCounter
