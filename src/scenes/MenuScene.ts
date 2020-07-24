import * as PIXI from 'pixi.js';
import PIXIsound from 'pixi-sound';
import Fantasia from '../Fantasia';
import Scene from '../Scene';
import WabiDialog from '../components/WabiDialog';
const TWITCHNG_URL = 'resources/se/character_twitching_01.mp3'

export default class MenuScene extends Scene {
  private readonly title_: PIXI.Text;
  private readonly character_: PIXI.Sprite;
  private characterTapCnt_: number;
  private readonly characterSe_: PIXI.sound.Sound;
  private readonly gatchaButton_: PIXI.Sprite;
  constructor(fantasia: Fantasia) {
    super(fantasia);

    const renderer = fantasia.renderer;

    // タイトル
    // TODO: だいたい「何か」が左上にあるのは間違いないが、
    // 「それっぽさ」的にはタイトルおいとけばいいのか？
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
      const rt = PIXI.RenderTexture.create({
        width: g.width,
        height: g.height,
      });
      renderer.render(g, rt);
      return new PIXI.Sprite(rt);
    })();
    this.character_.anchor.x = 0.5;
    this.character_.anchor.y = 0.5;
    this.character_.y = renderer.height/2;
    this.character_.x = renderer.width/3;
    this.character_.interactive = true;
    this.characterTapCnt_ = 0;
    // キャラSE
    const characterSe = TWITCHNG_URL;
    this.loader.add(characterSe);
    this.characterSe_ = PIXIsound.Sound.from(characterSe);
    let characterTapFn = () => {
      this.characterSe_.play();
      if(this.characterTapCnt_ > 0) {
        return;
      }
      this.characterTapCnt_ = 300;
    };
    this.character_.on('tap', characterTapFn);
    this.character_.on('click', characterTapFn);
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
      const rt = PIXI.RenderTexture.create({
        width: g.width,
        height: g.height,
      });
      renderer.render(g, rt);
      return new PIXI.Sprite(rt);
    })();
    this.stage.addChild(this.gatchaButton_);
    this.gatchaButton_.anchor.x = 0.5;
    this.gatchaButton_.anchor.y = 0.5;
    this.gatchaButton_.y = renderer.height/2;
    this.gatchaButton_.x = renderer.width*3/4;
    let gatchaTapFn = () => {
      const dialog = new WabiDialog();
      dialog.pivot.x = dialog.width/2;
      dialog.pivot.y = dialog.height/2;
      dialog.x = renderer.width/2;
      dialog.y = renderer.height/2;
      this.stage.addChild(dialog);
    };
    this.gatchaButton_.interactive = true;
    this.gatchaButton_.on('tap', gatchaTapFn);
    this.gatchaButton_.on('click', gatchaTapFn);
  }

  move(elapsed: number, delta: number) {
    const renderer = this.fantasia.renderer;

    // キャラを動かす
    const charaCnt = 300 - this.characterTapCnt_;
    this.character_.y = renderer.height/2 - 10 * Math.exp(-charaCnt/150) * Math.abs(Math.sin(charaCnt / 50));
    this.character_.x = renderer.width/3;
    this.characterTapCnt_ = Math.max(this.characterTapCnt_ - delta, 0);
  }

  onStart() {
    super.onStart();
  }

  onEnd() {
    super.onEnd();
  }
}
