'use strict';


var vs_noTexture = "\nprecision mediump float;\n\nattribute vec2 a_position;\nattribute vec3 a_color;\n\nuniform mat4 u_projectionMat;\n\nvarying vec3 v_color;\n\nvoid main() {\n  gl_Position = u_projectionMat * vec4(a_position, 0, 1);\n  v_color = a_color;\n}\n    ";

var fs_noTexture = "\nprecision mediump float;\n\nvarying vec3 v_color;\n\nvoid main() {\n  gl_FragColor = vec4(v_color, 1.0);\n}\n    ";

exports.vs_noTexture = vs_noTexture;
exports.fs_noTexture = fs_noTexture;
/* No side effect */
