import * as PIXI from 'pixi.js';
import Fantasia from '../Fantasia.js';
import Scene from '../Scene.js';
import {Howl} from 'howler';

export default class TitleScene extends Scene {
  /**
   * 
   * @param {Fantasia} fantasia 
   */
  constructor(fantasia) {
    super(fantasia);

    // タイトル
    const text = new PIXI.Text("オープンファンタジア", {fill: '0xffffffff'});
    this.stage.addChild(text);
    text.anchor.x = 0.5;
    text.x = fantasia.renderer.width/2;
    text.y = 90;

    // BGMのセットアップ
    const bgm = 'resources/music/TheAutumnsOurs.mp3';
    this.loader.add(bgm);
    this.sound_ = new Howl({
      src: [bgm]
    });
    this.sound_.load();
  }

  /**
   * 
   * @param {number} delta 
   */
  move(delta) {
  }

  onStart(){
    super.onStart();
    this.sound_.play();
  }
  onEnd(){
    super.onEnd();
    this.sound_.stop();
    this.sound_.unload();
  }
}
