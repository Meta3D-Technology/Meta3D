'use strict';


var componentName = "Transform";

var dataName = {
  name: 0,
  parent: 1,
  children: 2,
  localPosition: 3,
  localRotation: 4,
  localScale: 5,
  position: 6,
  rotation: 7,
  scale: 8,
  localEulerAngles: 9,
  eulerAngles: 10,
  normalMatrix: 11,
  localToWorldMatrix: 12,
  dirty: 13,
  update: 14
};

exports.componentName = componentName;
exports.dataName = dataName;
/* No side effect */
