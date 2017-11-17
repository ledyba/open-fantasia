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
    const loader = nextScene.loader;
    loader.onProgress.add(() => {}); // called once per loaded/errored file
    loader.onError.add(() => {}); // called once per errored file
    loader.onLoad.add(() => {}); // called once per loaded file
    loader.onComplete.add(() => {}); // called once when the queued resources all load.
  }

  onProgress() {

  }

};