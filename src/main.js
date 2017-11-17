import Fantasia from './Fantasia.js';
import Scene from './Scene.js';
import MenuScene from './scenes/MenuScene.js';

function main() {
  let fantasia = new Fantasia();
  fantasia.enterScene(new MenuScene(fantasia));
  fantasia.start(document.body);
  window.requestAnimationFrame(() => {
    fantasia.run();
  });
}

main();