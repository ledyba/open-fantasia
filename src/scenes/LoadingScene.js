import * as PIXI from 'pixi.js';
import Fantasia from '../Fantasia.js';
import Scene from '../Scene.js';

export default class LoadingScene extends Scene{
  /**
   * 
   * @param {Fantasia} fantasia 
   * @param {string[]} resources
   * @param {Scene} nextScene
   */
  constructor(fantasia, nextScene) {
    super(fantasia);
    this.nextScene_ = nextScene;

    const text = new PIXI.Text("", {fill: '0xffffffff'});
    this.loadingText = text;
    this.stage.addChild(text);
    text.anchor.x = 1;
    text.anchor.y = 1;
    text.x = fantasia.renderer.width - 10;
    text.y = fantasia.renderer.height - 10;
    //
    const loader = nextScene.loader;
    // called once per errored file
    loader.onError.add(this.onError.bind(this));
    // called once per loaded file
    loader.onLoad.add(this.onLoad.bind(this));
    // called once when the queued resources all load.
    loader.load(this.onComplete.bind(this));

    /**
     * @type {number}
     * @private
     */
    this.time_ = 0;

    /**
     * @type {string}
     * @private
     */
    this.error_ = null;
  }

  /**
   * @param {number} delta 
   */
  move(delta) {
    this.time_ += delta;
    const loader = this.nextScene_.loader;

    if(this.error_ !== null) {
      this.loadingText.style.fill = "red";
    }
    
    let text = "";
    switch(Math.floor(this.time_ / 500) % 3) {
      case 0:
        text = "Now Loading.   ";
        break;
      case 1:
        text = "Now Loading..  ";
        break;
      case 2:
        text = "Now Loading... ";
        break;
    }
    let percent = "    "+(Math.floor(loader.progress) | 0);
    percent=percent.slice(-4);
    this.loadingText.text = text+percent+"%";
    
    // いまのところこれ以上何もしないけど、キャラが動いたりするのも良いかもしれない。
  }

  /**
   * @param {Error} err
   * @param {PIXI.loaders.Loader} loader 
   * @param {*} resources 
   */
  onError(err, loader, resource) {
    console.error(err);
    this.error_ = err.message;
  }
  /**
   * @param {Error} err
   * @param {PIXI.loaders.Loader} loader 
   * @param {PIXI.loaders.Resource} resource
   */
  onLoad(loader, resource) {
    console.log('['+resource.progressChunk.toFixed(2)+'%] ', resource.name);
  }

  /**
   * @param {PIXI.loaders.Loader} loader 
   * @param {PIXI.loaders.Resource} resource
   */
  onComplete(loader, resources) {
    console.log("Loaded.");
    // 次のシーンへ
    if(this.error_ === null){
      this.fantasia.enterScene(this.nextScene_);
    }
  }
};