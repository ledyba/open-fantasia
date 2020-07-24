import Fantasia from './Fantasia';
import TitleScene from './scenes/TitleScene';

function main() {
  let fantasia: Fantasia = new Fantasia();
  fantasia.enterScene(new TitleScene(fantasia));
  fantasia.start(document.getElementById("game")!);
  window.requestAnimationFrame(() => {
    fantasia.run();
  });
}

main();