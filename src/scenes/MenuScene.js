import * as PIXI from 'pixi.js';
import 'pixi-sound';
import Fantasia from '../Fantasia.js';
import Scene from '../Scene.js';

export default class MenuScene extends Scene {
  /**
   * 
   * @param {Fantasia} fantasia 
   */
  constructor(fantasia) {
    super(fantasia);

    const renderer = fantasia.renderer;

    this.loader.add("index.html"); //なんか書かないとLoadingがCompleteしたことにならないバグがある

    // タイトル
    this.title_ = new PIXI.Text("オープンファンタジア", {fill: '0xffffffff'});
    this.stage.addChild(this.title_);
    this.title_.anchor.x = 0;
    this.title_.x = 10;
    this.title_.y = 10;

    // ソシャゲのメニュー画面と言えばキャラの立ち絵
    /** @type {PIXI.Sprite} */
    // TODO: ランダムなキャラ画像に差し替える
    this.character_ = (() => {
      const g = new PIXI.Graphics();
      g.beginFill(0xffffff, 1);
      g.drawRoundedRect(0, 0, 300, 400, 30);
      const text = new PIXI.Text("キャラ画像");
      text.anchor.x = 0.5;
      text.anchor.y = 0.5;
      text.x = 150;
      text.y = 200;
      g.addChild(text);
      const rt = PIXI.RenderTexture.create(g.width, g.height);
      renderer.render(g, rt);
      return new PIXI.Sprite(rt);
    })();
    this.character_.anchor.x = 0.5;
    this.character_.anchor.y = 0.5;
    this.character_.y = renderer.height/2;
    this.character_.x = renderer.width/3;
    this.stage.addChild(this.character_);

    // ソシャゲと言えば、ガチャ。
    // TODO: 絵でボタンを書き直す
    /** @type {PIXI.Sprite} */
    this.gatchaButton_ = (() => {
      const g = new PIXI.Graphics();
      g.beginFill(0xffffff, 1);
      g.drawCircle(200, 200, 200);
      const text = new PIXI.Text("ガチャボタン");
      text.anchor.x = 0.5;
      text.anchor.y = 0.5;
      text.x = 200;
      text.y = 200;
      g.addChild(text);
      const rt = PIXI.RenderTexture.create(g.width, g.height);
      renderer.render(g, rt);
      return new PIXI.Sprite(rt);
    })();
    this.gatchaButton_.anchor.x = 0.5;
    this.gatchaButton_.anchor.y = 0.5;
    this.gatchaButton_.y = renderer.height/2;
    this.gatchaButton_.x = renderer.width*3/4;
    this.stage.addChild(this.gatchaButton_);
  }

  /**
   * @param {number} elapsed 
   * @param {number} delta 
   */
  move(elapsed, delta) {
    const renderer = this.fantasia.renderer;
  }

  onStart(){
    super.onStart();
  }
  onEnd(){
    super.onEnd();
  }
}
