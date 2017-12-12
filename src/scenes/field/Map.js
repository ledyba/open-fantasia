export default class Map {
  /**
   * 
   * @param {number} w 
   * @param {number} h 
   */
  constructor(w,h) {
    this.width = w;
    this.height = h;
    this.field_ = new Array(w * h);
  }

  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @returns {number}
   * @private
   */
  calcIndex_(x,y) {
    if(x < 0 || x >= this.width || y < 0 || y >= this.height) {
      throw new Error("invalid index");
    }
    return y * this.width + x;
  }

  /**
   * @param {number} x 
   * @param {number} y 
   */
  at(x, y) {
    return this.field_[this.calcIndex_(x,y)];
  }

  /**
   * @param {number} x 
   * @param {number} y 
   */
  set(x, y, v) {
    const idx = this.calcIndex_(x,y);
    const old = this.field_[idx];
    this.field_[idx] = v;
    if(old !== v) {
      // TODO: Emit change events
    }
  }

}