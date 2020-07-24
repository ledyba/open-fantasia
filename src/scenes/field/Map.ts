export default class Map {
  private readonly width: number;
  private readonly height: number;
  private readonly field: number[];
  constructor(w: number,h: number) {
    this.width = w;
    this.height = h;
    this.field = new Array(w * h);
  }

  private calcIndex_(x: number,y: number): number {
    if(x < 0 || x >= this.width || y < 0 || y >= this.height) {
      throw new Error("invalid index");
    }
    return y * this.width + x;
  }

  at(x: number, y: number) {
    return this.field[this.calcIndex_(x,y)];
  }

  set(x: number, y: number, v: number) {
    const idx = this.calcIndex_(x,y);
    const old = this.field[idx];
    this.field[idx] = v;
    if(old !== v) {
      // TODO: Emit change events
    }
  }

}