import DOM from "./DOM";

class Face  extends DOM{

  getHTMLStr(): string {
    return `
      <div class="face">
        <img src="./img/face_normal.bmp" alt="">
      </div>
    `
  }
}
export default Face