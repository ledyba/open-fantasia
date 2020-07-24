import * as PIXI from 'pixi.js';
import Fantasia from './Fantasia';

export default abstract class Scene {
  protected readonly fantasia: Fantasia;
  protected readonly stage: PIXI.Container;
  public loader_: PIXI.Loader | null;
  private loaded: boolean;
  constructor(fantasia: Fantasia) {
    this.fantasia = fantasia;
    this.stage = new PIXI.Container();
    this.loader_ = null;
    this.loaded = false;
  }

  get loader(): PIXI.Loader {
    if(this.loader_){
      return this.loader_!;
    }
    this.loader_ = new PIXI.Loader();
    this.loader.onComplete.once(() =>{
      this.loaded = true;
    });
    return this.loader_;
  }
  get loadingRequired(): boolean {
    return !!this.loader_ && !this.loaded;
  }
  
  abstract move(elapsed: number, delta: number): void;

  /**
   * シーンが開始する時に呼ばれる
   */
  onStart() {
  }

  /**
   * シーンが終わる時に呼ばれる
   */
  onEnd() {
    if(this.loader_) {
      this.loader.destroy();
    }
  }

  draw(renderer: PIXI.Renderer) {
    renderer.render(this.stage);
  }
}
