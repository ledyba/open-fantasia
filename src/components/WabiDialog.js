import * as PIXI from 'pixi.js';
import Fantasia from '../Fantasia.js';
import Button from './Button.js'

export default class WabiDialog extends PIXI.Graphics {
  constructor() {
    super();

    const width = 800;
    const height = 300;

    /** @type {PIXI.Graphics} */
    const g = this;
    
    g.beginFill(0xffffff, 1);
    g.lineStyle(5, 0x333333);
    g.drawRoundedRect(0, 0, width, height, 30);
    g.endFill();
    g.lineStyle(0, 0);
    const title = new PIXI.Text("メンテナンス中");
    title.anchor.x = 0.5;
    title.anchor.y = 0;
    title.x = width/2;
    title.y = 20;
    g.beginFill(0xffdddd, 1);
    g.drawRoundedRect(20, 15, 760, title.height + 10, 10);
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

    const forkButton = new Button(new PIXI.Text("See Github"), 0xffffff, 0xffdddd, 180, 60);
    g.addChild(forkButton);
    forkButton.x = width/3 - 90;
    forkButton.y = height - 60 - 10;
    const forkFn = () => {
      window.open('https://github.com/open-dokidokivisual/fantasia');
    };
    forkButton.on('tap', forkFn);
    forkButton.on('click', forkFn);

    const closeButton = new Button(new PIXI.Text("Close"), 0xffffff, 0xffdddd, 180, 60);
    g.addChild(closeButton);
    closeButton.x = width*2/3 - 90;
    closeButton.y = height - 60 - 10;
    const closeFn = () => {
      this.parent.removeChild(this);
    };
    closeButton.on('tap', closeFn);
    closeButton.on('click', closeFn);
    
  }

  /**
   * @param {number} delta 
   */
  move(delta) {
  }
}