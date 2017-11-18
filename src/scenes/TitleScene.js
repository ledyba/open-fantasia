import * as PIXI from 'pixi.js';
import 'pixi-sound';
import Fantasia from '../Fantasia.js';
import Scene from '../Scene.js';
import LoadingScene from './LoadingScene.js';
import MenuScene from './MenuScene.js';

export default class TitleScene extends Scene {
  /**
   * 
   * @param {Fantasia} fantasia 
   */
  constructor(fantasia) {
    super(fantasia);

    const renderer = fantasia.renderer;

    // TODO: 全部絵にするか、もう少し飾りをつける。
    
    // タイトル
    this.title_ = new PIXI.Text("オープンファンタジア", {fill: '0xffffffff', fontSize: 48});
    this.stage.addChild(this.title_);
    this.title_.anchor.x = 0.5;

    // タイトル
    this.press_ = new PIXI.Text("タップして冒険の扉を開く", {fill: '0xffffffff'});
    this.stage.addChild(this.press_);
    this.press_.anchor.x = 0.5;

    // クリックを検知するための設定
    this.clickTarget_ = new PIXI.Graphics();
    this.clickTarget_.beginFill(0x000000,0.0);
    this.clickTarget_.drawRect(0, 0, renderer.width, renderer.height);
    this.clickTarget_.interactive = true;
    this.clickTarget_.on("tap", this.onTap.bind(this));
    this.clickTarget_.on("click", this.onTap.bind(this));
    this.stage.addChild(this.clickTarget_);
    
    // BGMのセットアップ
    const bgm = 'resources/music/TheAutumnsOurs.mp3';
    const buttonSe = 'resources/se/button_long01.mp3';
    this.loader.add(bgm);
    this.loader.add(buttonSe);
    
    this.sound_ = PIXI.sound.Sound.from(bgm);
    this.buttonSe_ = PIXI.sound.Sound.from(buttonSe);

    this.buttonFreq_ = 400;
  }

  /**
   * @param {number} elapsed 
   * @param {number} delta 
   */
  move(elapsed, delta) {
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
    // メニューシーンへ移動
    const fantasia = this.fantasia;
    this.buttonFreq_ = 150;
    this.sound_.volume=0.7;
    this.buttonSe_.volume = 2;
    this.buttonSe_.play("", () => {
      fantasia.enterScene(new LoadingScene(fantasia, new MenuScene(fantasia)));
    });
  }

  onStart(){
    super.onStart();
    this.sound_.play();
  }
  onEnd(){
    super.onEnd();
    this.sound_.stop();
  }
}
