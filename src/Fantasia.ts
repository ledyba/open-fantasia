import * as PIXI from 'pixi.js';
import Scene from './Scene'
import LoadingScene from './scenes/LoadingScene';

export default class Fantasia {
  public readonly renderer: PIXI.Renderer;
  private parent: HTMLElement | null;
  private scene: Scene | null;
  private lastMove: number;
  private sceneStarted: number;
  private readonly runner: () => void;

  constructor() {
    this.renderer = PIXI.autoDetectRenderer({
      width: 1024,
      height: 576,
      antialias:true
    });

    this.parent = null;
    this.scene = null;
    this.lastMove = NaN;
    this.sceneStarted = NaN;
    
    this.runner = this.run.bind(this);
  }
  start(parent: HTMLElement) {
    this.parent = parent;
    this.parent.appendChild(this.renderer.view);
  }
  enterScene(scene: Scene) {
    if(this.scene) {
      this.scene.onEnd();
    }
    if(scene.loadingRequired) {
      scene = new LoadingScene(this, scene);
    }
    this.scene = scene;
    this.sceneStarted = new Date().getTime();
    if(this.scene) {
      this.scene.onStart();
    }
  }

  run() {
    window.requestAnimationFrame(this.runner);
    const now = new Date().getTime();
    if(Number.isNaN(this.lastMove)) {
      this.lastMove = now;
    }
    this.scene!.move(now - this.sceneStarted, now - this.lastMove);
    this.lastMove = now;
    this.scene!.draw(this.renderer);
  }
}