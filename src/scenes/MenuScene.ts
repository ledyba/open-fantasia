import * as PIXI from 'pixi.js';
import PIXIsound from 'pixi-sound';
import Fantasia from '../Fantasia';
import Scene from '../Scene';
import WabiDialog from '../components/WabiDialog';
const TWITCHNG_URL = 'resources/se/character_twitching_01.mp3'

export default class MenuScene extends Scene {
  private readonly title: PIXI.Text;
  private readonly character: PIXI.Sprite;
  private characterTapCnt: number;
  private readonly characterSe: PIXI.sound.Sound;
  private readonly gatchaButton: PIXI.Sprite;
  constructor(fantasia: Fantasia) {
    super(fantasia);

    const renderer = fantasia.renderer;

    // タイトル
    // TODO: だいたい「何か」が左上にあるのは間違いないが、
    // 「それっぽさ」的にはタイトルおいとけばいいのか？
    this.title = new PIXI.Text("オープンファンタジア", {fill: '0xffffffff'});
    this.stage.addChild(this.title);
    this.title.anchor.x = 0;
    this.title.x = 10;
    this.title.y = 10;

    // ソシャゲのメニュー画面と言えばキャラの立ち絵
    /** @type {PIXI.Sprite} */
    // TODO: ランダムなキャラ画像に差し替える
    this.character = (() => {
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
    this.character.anchor.x = 0.5;
    this.character.anchor.y = 0.5;
    this.character.y = renderer.height/2;
    this.character.x = renderer.width/3;
    this.character.interactive = true;
    this.characterTapCnt = 0;
    // キャラSE
    const characterSe = TWITCHNG_URL;
    this.loader.add(characterSe);
    this.characterSe = PIXIsound.Sound.from(characterSe);
    let characterTapFn = () => {
      this.characterSe.play();
      if(this.characterTapCnt > 0) {
        return;
      }
      this.characterTapCnt = 300;
    };
    this.character.on('tap', characterTapFn);
    this.character.on('click', characterTapFn);
    this.stage.addChild(this.character);

    // ソシャゲと言えば、ガチャ。
    // TODO: 絵でボタンを書き直す
    /** @type {PIXI.Sprite} */
    this.gatchaButton = (() => {
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
    this.stage.addChild(this.gatchaButton);
    this.gatchaButton.anchor.x = 0.5;
    this.gatchaButton.anchor.y = 0.5;
    this.gatchaButton.y = renderer.height/2;
    this.gatchaButton.x = renderer.width*3/4;
    let gatchaTapFn = () => {
      const dialog = new WabiDialog();
      dialog.pivot.x = dialog.width/2;
      dialog.pivot.y = dialog.height/2;
      dialog.x = renderer.width/2;
      dialog.y = renderer.height/2;
      this.stage.addChild(dialog);
    };
    this.gatchaButton.interactive = true;
    this.gatchaButton.on('tap', gatchaTapFn);
    this.gatchaButton.on('click', gatchaTapFn);
  }

  move(elapsed: number, delta: number) {
    const renderer = this.fantasia.renderer;

    // キャラを動かす
    const charaCnt = 300 - this.characterTapCnt;
    this.character.y = renderer.height/2 - 10 * Math.exp(-charaCnt/150) * Math.abs(Math.sin(charaCnt / 50));
    this.character.x = renderer.width/3;
    this.characterTapCnt = Math.max(this.characterTapCnt - delta, 0);
  }

  onStart() {
    super.onStart();
  }

  onEnd() {
    super.onEnd();
  }
}
