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
  private readonly title_: PIXI.Text;
  private readonly press_: PIXI.Text;
  private readonly clickTarget_: PIXI.Graphics;
  private bg_: PIXI.Sprite | null;
  private readonly bgUrl_: string;
  private readonly sound_: PIXI.sound.Sound;
  private readonly buttonSe_: PIXI.sound.Sound;
  private buttonFreq_: number;
  constructor(fantasia: Fantasia) {
    super(fantasia);

    const renderer = fantasia.renderer;

    // TODO: 全部絵にするか、もう少し飾りをつける。

    // タイトル
    this.title_ = new PIXI.Text("オープンファンタジア", {
      fill: '0xffffffff',
      fontSize: 48,
      dropShadow: true,
      dropShadowBlur: 10,
      dropShadowDistance: 0,
      dropShadowColor: '0x000000'
    });
    this.stage.addChild(this.title_);
    this.title_.anchor.x = 0.5;

    // タイトル
    this.press_ = new PIXI.Text("タップして冒険の扉を開く", {
      fill: '0xffffffff',
      dropShadow: true,
      dropShadowBlur: 10,
      dropShadowDistance: 0,
      dropShadowColor: '0x000000'
    });
    this.stage.addChild(this.press_);
    this.press_.anchor.x = 0.5;

    // クリックを検知するための設定
    this.clickTarget_ = new PIXI.Graphics();
    this.clickTarget_.beginFill(0x000000,0.0);
    this.clickTarget_.x = 0;
    this.clickTarget_.y = 0;
    this.clickTarget_.width = renderer.width;
    this.clickTarget_.height = renderer.height;
    this.clickTarget_.drawRect(0, 0, renderer.width, renderer.height);
    this.clickTarget_.hitArea = new PIXI.Rectangle(0, 0, renderer.width, renderer.height);
    this.clickTarget_.interactive = true;
    this.clickTarget_.zIndex = -1;
    this.clickTarget_.on("tap", this.onTap.bind(this));
    this.clickTarget_.on("click", this.onTap.bind(this));
    this.stage.addChild(this.clickTarget_);

    // 背景
    /** @type {PIXI.Sprite} */
    this.bg_ = null;
    this.bgUrl_ = selectBackgroundURL();
    this.loader.add(this.bgUrl_);
    
    // BGMのセットアップ
    const bgm = selectMusicURL();
    const buttonSe = SE_URL;
    this.loader.add(bgm);
    this.loader.add(buttonSe);
    
    this.sound_ = PIXIsound.Sound.from(bgm);
    this.buttonSe_ = PIXIsound.Sound.from(buttonSe);

    this.buttonFreq_ = 400;
  }

  move(elapsed: number, delta: number) {
    const renderer = this.fantasia.renderer;

    // タイトルをうにょうにょさせる
    const sin = Math.sin(elapsed / 300);
    this.title_.x = renderer.width/2 - sin * 5;
    this.title_.y = 90 + sin * 5;

    // 開始メッセージを点滅させる
    this.press_.x = renderer.width/2;
    this.press_.y = renderer.height*3/4;
    this.press_.alpha = Math.abs(Math.sin(elapsed / this.buttonFreq_));
  }

  onTap() {
    if(this.buttonSe_.isPlaying) {
      return;
    }
    // メニューシーンへ移動
    const fantasia = this.fantasia;
    this.buttonFreq_ = 150;
    this.sound_.volume=0.7;
    this.buttonSe_.volume = 2;
    this.buttonSe_.play("", () => {
      fantasia.enterScene(new MenuScene(fantasia));
    });
  }

  onStart() {
    super.onStart();
    this.sound_.play();
    const fantasia = this.fantasia;
    const renderer = fantasia.renderer;
    
    this.bg_ = new PIXI.Sprite(this.loader.resources[this.bgUrl_].texture);
    this.bg_.width = renderer.width;
    this.bg_.height = renderer.height;
    this.stage.addChildAt(this.bg_, 0);
    
  }
  onEnd() {
    super.onEnd();
    this.sound_.stop();
  }
}
