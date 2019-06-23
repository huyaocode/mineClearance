import DOM from "./DOM";

class DifficultyPicker extends DOM{

  getHTMLStr(): string {
    return `
      <div class="option">
        <span>难度</span>
        <ul class="difficul">
            <li><label><input name="Fruit" type="radio" value="0" /><span></span>初级 </label></li>
            <li><label><input name="Fruit" type="radio" value="1" /><span></span>中级 </label></li>
            <li><label><input name="Fruit" type="radio" value="2" checked/><span></span>高级 </label></li>
        </ul>
      </div>
    `
  }
}

export default DifficultyPicker