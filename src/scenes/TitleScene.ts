import * as PIXI from 'pixi.js';
import PIXIsound from 'pixi-sound';
import Fantasia from '../Fantasia';
import Scene from '../Scene';
import MenuScene from './MenuScene';

const SE_URL = 'resources/se/button_long01.mp3';

function isChristmas():boolean {
  const today = new Date();
  return today.getMonth() == 11 && (today.getDate() >= 20 && today.getDate() <= 25);
}

function selectBackgroundURL():string {
  return isChristmas() ? 'resources/bg/img605.jpg' : 'resources/bg/DSC03634.JPG';
}

function selectMusicURL(): string {
  return isChristmas() ? 'resources/music/Rudolph.mp3' : 'resources/music/TheAutumnsOurs.mp3';
}

export default class TitleScene extends Scene {
  private readonly title: PIXI.Text;
  private readonly press: PIXI.Text;
  private readonly clickTarget: PIXI.Graphics;
  private bg: PIXI.Sprite | null;
  private readonly bgUrl: string;
  private readonly sound: PIXI.sound.Sound;
  private readonly buttonSe: PIXI.sound.Sound;
  private buttonFreq: number;
  constructor(fantasia: Fantasia) {
    super(fantasia);

    const renderer = fantasia.renderer;

    // TODO: 全部絵にするか、もう少し飾りをつける。

    // タイトル
    this.title = new PIXI.Text("オープンファンタジア", {
      fill: '0xffffffff',
      fontSize: 48,
      dropShadow: true,
      dropShadowBlur: 10,
      dropShadowDistance: 0,
      dropShadowColor: '0x000000'
    });
    this.stage.addChild(this.title);
    this.title.anchor.x = 0.5;

    // タイトル
    this.press = new PIXI.Text("タップして冒険の扉を開く", {
      fill: '0xffffffff',
      dropShadow: true,
      dropShadowBlur: 10,
      dropShadowDistance: 0,
      dropShadowColor: '0x000000'
    });
    this.stage.addChild(this.press);
    this.press.anchor.x = 0.5;

    // クリックを検知するための設定
    this.clickTarget = new PIXI.Graphics();
    this.clickTarget.beginFill(0x000000,0.0);
    this.clickTarget.x = 0;
    this.clickTarget.y = 0;
    this.clickTarget.width = renderer.width;
    this.clickTarget.height = renderer.height;
    this.clickTarget.drawRect(0, 0, renderer.width, renderer.height);
    this.clickTarget.hitArea = new PIXI.Rectangle(0, 0, renderer.width, renderer.height);
    this.clickTarget.interactive = true;
    this.clickTarget.zIndex = -1;
    this.clickTarget.on("tap", this.onTap.bind(this));
    this.clickTarget.on("click", this.onTap.bind(this));
    this.stage.addChild(this.clickTarget);

    // 背景
    /** @type {PIXI.Sprite} */
    this.bg = null;
    this.bgUrl = selectBackgroundURL();
    this.loader.add(this.bgUrl);
    
    // BGMのセットアップ
    const bgm = selectMusicURL();
    const buttonSe = SE_URL;
    this.loader.add(bgm);
    this.loader.add(buttonSe);
    
    this.sound = PIXIsound.Sound.from(bgm);
    this.buttonSe = PIXIsound.Sound.from(buttonSe);

    this.buttonFreq = 400;
  }

  move(elapsed: number, delta: number) {
    const renderer = this.fantasia.renderer;

    // タイトルをうにょうにょさせる
    const sin = Math.sin(elapsed / 300);
    this.title.x = renderer.width/2 - sin * 5;
    this.title.y = 90 + sin * 5;

    // 開始メッセージを点滅させる
    this.press.x = renderer.width/2;
    this.press.y = renderer.height*3/4;
    this.press.alpha = Math.abs(Math.sin(elapsed / this.buttonFreq));
  }

  onTap() {
    if(this.buttonSe.isPlaying) {
      return;
    }
    // メニューシーンへ移動
    const fantasia = this.fantasia;
    this.buttonFreq = 150;
    this.sound.volume=0.7;
    this.buttonSe.volume = 2;
    this.buttonSe.play("", () => {
      fantasia.enterScene(new MenuScene(fantasia));
    });
  }

  onStart() {
    super.onStart();
    this.sound.play();
    const fantasia = this.fantasia;
    const renderer = fantasia.renderer;
    
    this.bg = new PIXI.Sprite(this.loader.resources[this.bgUrl].texture);
    this.bg.width = renderer.width;
    this.bg.height = renderer.height;
    this.stage.addChildAt(this.bg, 0);
    
  }
  onEnd() {
    super.onEnd();
    this.sound.stop();
  }
}
