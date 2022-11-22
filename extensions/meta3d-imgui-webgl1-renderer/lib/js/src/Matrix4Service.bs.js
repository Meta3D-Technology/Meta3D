'use strict';


function createIdentityMatrix4(param) {
  return new Float32Array([
              1,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              1
            ]);
}

function ortho(left, right, bottom, top, near, far, resultFloat32Arr) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  resultFloat32Arr[0] = -2 * lr;
  resultFloat32Arr[1] = 0;
  resultFloat32Arr[2] = 0;
  resultFloat32Arr[3] = 0;
  resultFloat32Arr[4] = 0;
  resultFloat32Arr[5] = -2 * bt;
  resultFloat32Arr[6] = 0;
  resultFloat32Arr[7] = 0;
  resultFloat32Arr[8] = 0;
  resultFloat32Arr[9] = 0;
  resultFloat32Arr[10] = 2 * nf;
  resultFloat32Arr[11] = 0;
  resultFloat32Arr[12] = (left + right) * lr;
  resultFloat32Arr[13] = (top + bottom) * bt;
  resultFloat32Arr[14] = (far + near) * nf;
  resultFloat32Arr[15] = 1;
  return resultFloat32Arr;
}

exports.createIdentityMatrix4 = createIdentityMatrix4;
exports.ortho = ortho;
/* No side effect */
