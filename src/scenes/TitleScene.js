import * as PIXI from 'pixi.js';
import 'pixi-sound';
import Fantasia from '../Fantasia.js';
import Scene from '../Scene.js';

export default class TitleScene extends Scene {
  /**
   * 
   * @param {Fantasia} fantasia 
   */
  constructor(fantasia) {
    super(fantasia);

    // タイトル
    this.title_ = new PIXI.Text("オープンファンタジア", {fill: '0xffffffff'});
    this.stage.addChild(this.title_);
    this.title_.anchor.x = 0.5;

    // BGMのセットアップ
    const bgm = 'resources/music/TheAutumnsOurs.mp3';
    this.loader.add(bgm);
    
    this.sound_ = PIXI.sound.Sound.from(bgm);
  }

  /**
   * @param {number} elapsed 
   * @param {number} delta 
   */
  move(elapsed, delta) {
    const renderer = this.fantasia.renderer;
    const sin = Math.sin(elapsed / 300);
    this.title_.x = renderer.width/2 - sin * 5;
    this.title_.y = 90 + sin * 5;
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
