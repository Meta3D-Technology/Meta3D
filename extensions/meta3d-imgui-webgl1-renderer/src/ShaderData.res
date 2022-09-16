// let vs_customTexture = `
// precision mediump float;

// attribute vec2 a_position;
// attribute vec3 a_color;
// attribute vec2 a_texCoord;

// uniform mat4 u_projectionMat;

// varying vec3 v_color;
// varying vec2 v_texCoord;

// void main() {
//   gl_Position = u_projectionMat * vec4(a_position, 0, 1);
//   v_color = a_color;
//   v_texCoord = a_texCoord;
// }
//     `

// let fs_customTexture = `
// precision mediump float;

// varying vec3 v_color;
// varying vec2 v_texCoord;

// uniform sampler2D u_sampler2D;

// void main() {
//   vec4 sample = texture2D(u_sampler2D, v_texCoord);

//   gl_FragColor = vec4(v_color * sample.xyz, sample.w);
// }
//     `

// let vs_fontTexture = `
// precision mediump float;

// attribute vec2 a_position;
// attribute vec3 a_color;
// attribute vec2 a_texCoord;

// uniform mat4 u_projectionMat;

// varying vec3 v_color;
// varying vec2 v_texCoord;

// void main() {
//   gl_Position = u_projectionMat * vec4(a_position, 0, 1);
//   v_color = a_color;
//   v_texCoord = a_texCoord;
// }
//     `

// let fs_fontTexture = `
// precision mediump float;

// varying vec3 v_color;
// varying vec2 v_texCoord;

// uniform sampler2D u_sampler2D;

// void main() {
//   vec4 sample = texture2D(u_sampler2D, v_texCoord);

//   gl_FragColor = vec4(v_color * sample.xyz, sample.w);
// }
//     `

let vs_noTexture = `
precision mediump float;

attribute vec2 a_position;
attribute vec3 a_color;

uniform mat4 u_projectionMat;

varying vec3 v_color;

void main() {
  gl_Position = u_projectionMat * vec4(a_position, 0, 1);
  v_color = a_color;
}
    `

let fs_noTexture = `
precision mediump float;

varying vec3 v_color;

void main() {
  gl_FragColor = vec4(v_color, 1.0);
}
    `
