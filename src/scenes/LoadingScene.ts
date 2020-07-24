import * as PIXI from 'pixi.js';
import Fantasia from '../Fantasia';
import Scene from '../Scene'

export default class LoadingScene extends Scene {
  private readonly nextScene: Scene;
  private readonly loadingText: PIXI.Text;
  private error: string | null;
  constructor(fantasia: Fantasia, nextScene: Scene) {
    super(fantasia);
    this.nextScene = nextScene;

    const text = new PIXI.Text("", {fill: '0xffffffff'});
    this.loadingText = text;
    this.stage.addChild(text);
    text.anchor.x = 1;
    text.anchor.y = 1;
    text.x = fantasia.renderer.width - 10;
    text.y = fantasia.renderer.height - 10;
    //
    const loader = nextScene.loader;
    if(!loader) {
      throw new Error("We don't need to load anything.");
    }

    // called once per errored file
    loader.onError.add(this.onError.bind(this));
    // called once per loaded file
    loader.onLoad.add(this.onLoad.bind(this));
    // called once when the queued resources all load.
    loader.onComplete.add(this.onComplete.bind(this));
    loader.load();

    this.error = null;
  }

  /**
   * @param {number} elapsed 
   * @param {number} delta 
   */
  move(elapsed: number, delta: number) {
    const loader = this.nextScene.loader;

    if(!!this.error) {
      this.loadingText.style.fill = "red";
    }
    
    let text = "";
    switch(Math.floor(elapsed / 500) % 3) {
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

  onError(err: Error, loader: PIXI.Loader, resource: PIXI.resources.Resource) {
    console.error(err);
    this.error = err.message;
  }

  onLoad(loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) {
    console.log('['+loader.progress.toFixed(2)+'%]', resources.name);
  }

  onComplete(loader:  PIXI.Loader, resource: PIXI.resources.Resource) {
    console.log("Loaded.");
    // 次のシーンへ
    if(!this.error){
      this.fantasia.enterScene(this.nextScene);
    } else {
      console.error("Error when loading: ", this.error);
    }
  }
};