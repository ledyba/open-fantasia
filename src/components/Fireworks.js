import * as PIXI from 'pixi.js';
import Fantasia from '../Fantasia.js';
import Component from '../Component.js';

export default class Fireworks extends Component {
  /**
   * 
   * @param {PIXI.Container} parent
   */
  constructor(parent) {
    super(parent, new PIXI.particles.ParticleContainer());
    /** @type {PIXI.particles.ParticleContainer} container */
    this.container = this.container;
  }

  /**
   * @param {number} delta 
   */
  move(delta) {
  }
}