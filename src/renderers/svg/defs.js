/**
 * Created by Elaine on 2018/5/9.
 */
const Util = require('../../util/index');
const Gradient = require('./defs/gradient');
const Shadow = require('./defs/shadow');
const Arrow = require('./defs/arrow');
const Clip = require('./defs/clip');

class Defs {
  constructor(canvas) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const id = Util.uniqueId('defs_');
    el.id = id;
    canvas.appendChild(el);
    this.children = [];
    this.defaultArrow = {
      'marker-start': {},
      'marker-end': {}
    };
    this.el = el;
    this.canvas = canvas;
  }
  find(type, attr) {
    const children = this.children;
    let result = null;
    for (let i = 0; i < children.length; i++) {
      if (children[i].match(type, attr)) {
        result = children[i].id;
        break;
      }
    }
    return result;
  }
  findById(id) {
    const children = this.children;
    let flag = null;
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === id) {
        flag = children[i];
        break;
      }
    }
    return flag;
  }
  add(item) {
    this.el.appendChild(item.el);
    this.children.push(item);
    item.canvas = this.canvas;
    item.parent = this;
  }
  getDefaultArrow(attrs, name) {
    const stroke = attrs.stroke || attrs.strokeStyle;
    if (this.defaultArrow[name][stroke]) {
      return this.defaultArrow[name][stroke].id;
    }
    const arrow = new Arrow(attrs, name);
    this.defaultArrow[name][stroke] = arrow;
    return arrow.id;
  }
  addGradient(cfg) {
    const gradient = new Gradient(cfg);
    this.add(gradient);
    return gradient.id;
  }
  addArrow(attrs, name) {
    const arrow = new Arrow(attrs, name);
    return arrow.id;
  }
  addShadow(cfg) {
    const shadow = new Shadow(cfg);
    this.add(shadow);
    return shadow.id;
  }
  addClip(cfg) {
    const clip = new Clip(cfg);
    this.add(clip);
    return clip.id;
  }
}

module.exports = Defs;