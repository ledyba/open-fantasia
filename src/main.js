import Fantasia from './Fantasia.js';
import Scene from './Scene.js';
import TitleScene from './scenes/TitleScene.js';
import LoadingScene from './scenes/LoadingScene';

function main() {
  let fantasia = new Fantasia();
  fantasia.enterScene(new LoadingScene(fantasia, new TitleScene(fantasia)));
  fantasia.start(document.getElementById("game"));
  window.requestAnimationFrame(() => {
    fantasia.run();
  });
}

main();