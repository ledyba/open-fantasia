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

    const text = new PIXI.Text("Now Loading   : 0%", {fill: '0xffffffff'});
    this.loadingText = text;
    this.stage.addChild(text);
    text.anchor.x = 1;
    text.anchor.y = 1;
    text.x = fantasia.renderer.width - 10;
    text.y = fantasia.renderer.height - 10;
    //
    const loader = nextScene.loader;

    // called once per loaded/errored file
    loader.onProgress.add(this.onProgress.bind(this));

    // called once per errored file
    loader.onError.add(this.onError.bind(this));

    // called once per loaded file
    loader.onLoad.add(this.onLoad.bind(this));

    // called once when the queued resources all load.
    loader.onComplete.add(this.onComplete.bind(this));

    loader.load();

    this.time = 0;
  }

  /**
   * @param {number} delta 
   */
  move(delta) {
    this.time += delta;
    const loader = this.nextScene_.loader;
    
    let text = "";
    switch(Math.floor(this.time / 500) % 3) {
      case 0:
        text = "Now Loading.  : ";
        break;
      case 1:
        text = "Now Loading.. : ";
        break;
      case 2:
        text = "Now Loading...: ";
        break;
    }
    let percent = "    "+(Math.floor(loader.progress) | 0);
    percent=percent.slice(-4);
    this.loadingText.text = text+percent+"%";
    
    // いまのところこれ以上何もしないけど、キャラが動いたりするのも良いかもしれない。
  }

  /**
   * 
   * @param {PIXI.loaders.Loader} loader 
   * @param {*} resources 
   */
  onProgress(loader, resources) {
  }
  /**
   * @param {Error} err
   * @param {PIXI.loaders.Loader} loader 
   * @param {*} resources 
   */
  onError(err, loader, resource) {
    console.error(err);
  }
  /**
   * @param {Error} err
   * @param {PIXI.loaders.Loader} loader 
   * @param {PIXI.loaders.Resource} resource
   */
  onLoad(loader, resource) {
    console.log(resource.name, 'loaded:', resource.progressChunk, '%');
  }

  /**
   * @param {Error} err
   * @param {PIXI.loaders.Loader} loader 
   * @param {PIXI.loaders.Resource} resource
   */
  onComplete(loader, resources) {
    // 次のシーンへ

  }
};