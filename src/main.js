import Fantasia from './Fantasia.js'

function main() {
  let fantasia = new Fantasia();
  fantasia.start(document.body);
  window.requestAnimationFrame(() => {
    fantasia.run();
  });
}

main();