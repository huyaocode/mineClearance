import DOM from "../DOM";
import Block from '../Block';

abstract class MineArea extends DOM{
  row: number;
  col: number;
  protected mineMap:  Array<Array<any>>;
  protected blockMap:  Array<Array<Block>>;
  abstract createMineMap(): void
}

export default MineArea