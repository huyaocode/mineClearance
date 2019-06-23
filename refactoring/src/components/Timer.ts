import DOM from './DOM'

class Timer extends DOM {
  dom: any
  getHTMLStr(): string {
    return `
    <div class="timer">
        <img src="./img/d0.bmp" alt="">
        <img src="./img/d0.bmp" alt="">
        <img src="./img/d0.bmp" alt="">
    </div>
    `
  }
}

export default Timer
