import Fantasia from './Fantasia.js';
import Scene from './Scene.js';
import TopScene from './scenes/TopScene.js';

function main() {
  let fantasia = new Fantasia();
  fantasia.enterScene(new TopScene(fantasia));
  fantasia.start(document.body);
  window.requestAnimationFrame(() => {
    fantasia.run();
  });
}

main();