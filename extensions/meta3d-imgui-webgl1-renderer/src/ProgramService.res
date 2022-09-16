open Meta3dWebgl1Protocol.ServiceType

let _compileShader = ({ shaderSource, compileShader, getShaderParameter, getCompileStatus, getShaderInfoLog }, gl, glslSource: string, shader, isDebug) => {
  shaderSource(  shader, glslSource, gl)
  compileShader( shader, gl)
  Meta3dCommonlib.Log.debugWithFunc(() =>
    getShaderParameter( shader, getCompileStatus(gl), gl) === false
      ? {
          let message = getShaderInfoLog( shader, gl)
          Meta3dCommonlib.Log.debug(
            Meta3dCommonlib.Log.buildDebugMessage(~description="shader info log", ~params=j`$message`),
            isDebug,
          )
          Meta3dCommonlib.Log.debug(
            Meta3dCommonlib.Log.buildDebugMessage(~description="glsl source", ~params=j`$glslSource`),
            isDebug,
          )
        }
      : ()
  , isDebug)
  shader
}

let _linkProgram = ({linkProgram, getProgramParameter, getLinkStatus, getProgramInfoLog},  program, gl, isDebug) => {
  linkProgram( program, gl)
  Meta3dCommonlib.Log.debugWithFunc(() =>
    getProgramParameter(program, getLinkStatus(gl), gl) === false
      ? {
          let message = getProgramInfoLog(program, gl)
    Meta3dCommonlib.Exception.throwErr(
            Meta3dCommonlib.Log.buildFatalMessage(
              ~title="link program error",
              ~description=j`$message`,
              ~reason="",
              ~solution=j``,
              ~params=j``,
            ),
          )
        }
      : ()
  , isDebug)
  ()
}

let initShader = ({ createShader, getVertexShader, getFragmentShader, attachShader, bindAttribLocation, deleteShader } as webgl1Service, vsSource: string, fsSource: string, gl, isDebug, program: program) => {
  let vs = _compileShader(webgl1Service, gl, vsSource, createShader(getVertexShader(gl), gl), isDebug)
  let fs = _compileShader(webgl1Service, gl, fsSource, createShader(getFragmentShader(gl), gl), isDebug)

  /* dispose?
     if (this.glProgram) {
         this.dispose();
     } */
  attachShader(program, vs, gl)
  attachShader(program, fs, gl)
  /* !
    if warn:"Attribute 0 is disabled. This has significant performance penalty" when run,
    then do this before linkProgram:
    gl.bindAttribLocation( this.glProgram, 0, "a_position");



    can reference here:
    http://stackoverflow.com/questions/20305231/webgl-warning-attribute-0-is-disabled-this-has-significant-performance-penalt?answertab=votes#tab-top


    OpenGL requires attribute zero to be enabled otherwise it will not render anything.
    On the other hand OpenGL ES 2.0 on which WebGL is based does not. So, to emulate OpenGL ES 2.0 on top of OpenGL if you don't enable attribute 0 the browser has to make a buffer for you large enough for the number of vertices you've requested to be drawn, fill it with the correct value (see gl.vertexAttrib),
    attach it to attribute zero, and enable it.

    It does all this behind the scenes but it's important for you to know that it takes time to create and fill that buffer. There are optimizations the browser can make but in the general case,
    if you were to assume you were running on OpenGL ES 2.0 and used attribute zero as a constant like you are supposed to be able to do, without the warning you'd have no idea of the work the browser is doing on your behalf to emulate that feature of OpenGL ES 2.0 that is different from OpenGL.

    require your particular case the warning doesn't have much meaning. It looks like you are only drawing a single point. But it would not be easy for the browser to figure that out so it just warns you anytime you draw and attribute 0 is not enabled.
 */
  /* !
    Always have vertex attrib 0 array enabled. If you draw with vertex attrib 0 array disabled, you will force the browser to do complicated emulation when running on desktop OpenGL (e.g. on Mac OSX). This is because in desktop OpenGL, nothing gets drawn if vertex attrib 0 is not array-enabled. You can use bindAttribLocation() to force a vertex attribute to use location 0, and use enableVertexAttribArray() to make it array-enabled.
 */
  bindAttribLocation(program, 0, "a_position", gl)
  _linkProgram(webgl1Service, program, gl, isDebug)
  /* !
    should detach and delete shaders after linking the program

    explain:
    The shader object, due to being attached to the program object, will continue to exist even if you delete the shader object. It will only be deleted by the system when it is no longer attached to any program object (and when the user has asked to delete it, of course).

    "Deleting" the shader, as with all OpenGL objects, merely sets a flag that says you don't need it any more. OpenGL will keep it around for as long as it needs it itself, and will do the actual delete any time later (most likely, but not necessarily, after the program is deleted).
 */
  deleteShader(vs, gl)
  deleteShader(fs, gl)
  program
}

// let getProgram = (shaderIndex: int, {programMap}) =>
//   programMap -> WonderCommonlib.MutableSparseMapService.get(shaderIndex)

// let unsafeGetProgram = (shaderIndex: int, {programMap}) =>
//   programMap
//   -> WonderCommonlib.MutableSparseMapService.unsafeGet(shaderIndex)
//   -> Meta3dCommonlib.Contract.ensureCheck(program => {
//     open Meta3dCommonlib
//     open Contract
//     open Operators
//     test(Log.buildAssertMessage(~expect=j`program exist`, ~actual=j`not`), () =>
//       program -> assertNullableExist
//     )
//   }, isDebug)

// let registerProgram = (shaderIndex: int, {programMap}, program: program) => {
//   programMap -> WonderCommonlib.MutableSparseMapService.set(shaderIndex, program) -> ignore
//   program
// }

// let clearLastSendProgram = record => {...record, lastUsedProgram: None}
