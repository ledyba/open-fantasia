import * as PIXI from 'pixi.js';
import Fantasia from '../Fantasia.js';

export default class Dialog extends PIXI.Graphics {
  constructor() {
    super();

    /** @type {PIXI.Graphics} */
    const g = this;
    
    g.beginFill(0x000000, 1);
    g.drawRoundedRect(0, 0, 800, 300, 30);
    g.beginFill(0xffffff, 1);
    g.drawRoundedRect(5, 5, 790, 290, 30);
    const title = new PIXI.Text("メンテナンス中");
    title.anchor.x = 0.5;
    title.anchor.y = 0;
    title.x = 400;
    title.y = 20;
    g.beginFill(0xffdddd, 1);
    g.drawRoundedRect(20, 10, 760, title.height + 10, 10);
    g.addChild(title);

    const text = new PIXI.Text(
      "ただいま、緊急メンテナンスを実施しております。\n\n"+
      "ご利用の皆さまにはご不便をおかけいたしておりますが、\n"+
      "何卒ご理解とプルリクエストを宜しくお願い申し上げます。\n"+
      "https://github.com/open-dokidokivisual/fantasia")

    text.anchor.x = 0.5;
    text.anchor.y = 0;
    text.x = 400;
    text.y = 20 + title.height + 20;
    g.addChild(text);

  }

  /**
   * @param {number} delta 
   */
  move(delta) {
  }
}