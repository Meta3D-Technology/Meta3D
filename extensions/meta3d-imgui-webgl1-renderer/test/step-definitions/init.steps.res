open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Typed_array

let feature = loadFeature("./test/features/init.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let state: ref<StateType.state> = ref(Obj.magic(1))
  let webgl1Service = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })
  }

  test(."get webgl1 context", ({given, \"when", \"and", then}) => {
    let gl = 2->Obj.magic
    let canvas = 10->Obj.magic
    let getContextStub = ref(Obj.magic(1))

    _prepare(given)

    \"and"("prepare webgl1 service", () => {
      getContextStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(gl, _)

      webgl1Service :=
        WebGL1ServiceTool.buildService(~sandbox, ~getContext=getContextStub.contents->Obj.magic, ())
    })

    given("prepare canvas", () => {
      ()
    })

    \"when"("init", () => {
      state :=
        MainTool.init(~sandbox, ~webgl1Service=webgl1Service.contents, ~isDebug=false, ~canvas, ())
    })

    then("get webgl context with config", () => {
      (
        state.contents.gl,
        getContextStub.contents
        ->getCall(0, _)
        ->SinonTool.calledWithArg2(
          canvas,
          {
            "alpha": true,
            "depth": true,
            "stencil": false,
            "antialias": true,
            "premultipliedAlpha": true,
            "preserveDrawingBuffer": false,
          },
        ),
      )->expect == (gl->Some, true)
    })
  })

  test(."create program", ({given, \"when", \"and", then}) => {
    let program = 2->Obj.magic
    let createProgramStub = ref(Obj.magic(1))

    _prepare(given)

    \"and"("prepare webgl1 service", () => {
      createProgramStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(program, _)

      webgl1Service :=
        WebGL1ServiceTool.buildService(
          ~sandbox,
          ~createProgram=createProgramStub.contents->Obj.magic,
          (),
        )
    })

    \"when"("init", () => {
      state := MainTool.init(~sandbox, ~webgl1Service=webgl1Service.contents, ())
    })

    then("create no texture program", () => {
      (
        (state.contents.noTextureShaderData->Meta3dCommonlib.OptionSt.getExn).program,
        createProgramStub.contents->getCallCount,
      )->expect == (program, 1)
    })
  })

  test(."init shader", ({given, \"when", \"and", then}) => {
    let vsShader = 1->Obj.magic
    let fsShader = 2->Obj.magic
    let createShaderStub = ref(Obj.magic(1))
    let shaderSourceStub = ref(Obj.magic(1))

    _prepare(given)

    \"and"("prepare webgl1 service", () => {
      createShaderStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->onCall(0, _)
        ->returns(vsShader, _)
        ->onCall(1, _)
        ->returns(fsShader, _)
      shaderSourceStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      webgl1Service :=
        WebGL1ServiceTool.buildService(
          ~sandbox,
          ~createShader=createShaderStub.contents->Obj.magic,
          ~shaderSource=shaderSourceStub.contents->Obj.magic,
          (),
        )
    })

    \"when"("init", () => {
      state := MainTool.init(~sandbox, ~webgl1Service=webgl1Service.contents, ())
    })

    then("init no texture shader", () => {
      (
        shaderSourceStub.contents
        ->getCall(0, _)
        ->SinonTool.calledWithArg3(vsShader, ShaderData.vs_noTexture, matchAny),
        shaderSourceStub.contents
        ->getCall(1, _)
        ->SinonTool.calledWithArg3(fsShader, ShaderData.fs_noTexture, matchAny),
      )->expect == (true, true)
    })
  })

  test(."send no texture program uniform data", ({given, \"when", \"and", then}) => {
    let program = 1->Obj.magic
    let canvas = {
      "width": 100,
      "height": 200,
    }->Obj.magic
    let u_projectionMatLocation = 11
    let createProgramStub = ref(Obj.magic(1))
    let useProgramStub = ref(Obj.magic(1))
    let getUniformLocationStub = ref(Obj.magic(1))
    let uniformMatrix4fvStub = ref(Obj.magic(1))

    _prepare(given)

    \"and"("prepare webgl1 service", () => {
      createProgramStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(program, _)
      useProgramStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      getUniformLocationStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->withTwoArgs(program, "u_projectionMat", _)
        ->returns(u_projectionMatLocation, _)
      uniformMatrix4fvStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      webgl1Service :=
        WebGL1ServiceTool.buildService(
          ~sandbox,
          ~createProgram=createProgramStub.contents->Obj.magic,
          ~useProgram=useProgramStub.contents->Obj.magic,
          ~getUniformLocation=getUniformLocationStub.contents->Obj.magic,
          ~uniformMatrix4fv=uniformMatrix4fvStub.contents->Obj.magic,
          (),
        )
    })

    given("prepare canvas", () => {
      ()
    })

    \"when"("init", () => {
      state := MainTool.init(~sandbox, ~webgl1Service=webgl1Service.contents, ~canvas, ())
    })

    then("use program", () => {
      (
        useProgramStub.contents->getCallCount,
        useProgramStub.contents->getCall(0, _)->SinonTool.calledWithArg2(program, matchAny),
      )->expect == (1, true)
    })

    \"and"("send ortho projection matrix data", () => {
      uniformMatrix4fvStub.contents
      ->SinonTool.calledWithArg3(
        u_projectionMatLocation,
        Float32Array.make([
          0.019999999552965164,
          0.,
          0.,
          0.,
          0.,
          -0.009999999776482582,
          0.,
          0.,
          0.,
          0.,
          -1.,
          0.,
          -1.,
          1.,
          -0.,
          1.,
        ]),
        matchAny,
      )
      ->expect == true
    })
  })

  test(."get attribute location", ({given, \"when", \"and", then}) => {
    let program = 1->Obj.magic
    let aPositonLocation = 2
    let aColorLocation = 3
    let createProgramStub = ref(Obj.magic(1))
    let getAttribLocationStub = ref(Obj.magic(1))

    _prepare(given)

    \"and"("prepare webgl1 service", () => {
      createProgramStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(program, _)
      getAttribLocationStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      getAttribLocationStub.contents
      ->withThreeArgs(program, "a_position", matchAny, _)
      ->returns(aPositonLocation, _)
      ->ignore

      getAttribLocationStub.contents
      ->withThreeArgs(program, "a_color", matchAny, _)
      ->returns(aColorLocation, _)
      ->ignore

      webgl1Service :=
        WebGL1ServiceTool.buildService(
          ~sandbox,
          ~createProgram=createProgramStub.contents->Obj.magic,
          ~getAttribLocation=getAttribLocationStub.contents->Obj.magic,
          (),
        )
    })

    \"when"("init", () => {
      state := MainTool.init(~sandbox, ~webgl1Service=webgl1Service.contents, ())
    })

    then("get a_position, a_color location", () => {
      (
        (state.contents.noTextureShaderData->Meta3dCommonlib.OptionSt.getExn).aPositonLocation,
        (state.contents.noTextureShaderData->Meta3dCommonlib.OptionSt.getExn).aColorLocation,
      )->expect == (aPositonLocation, aColorLocation)
    })
  })

  test(."create and init vao buffers", ({given, \"when", \"and", then}) => {
    let positionBuffer = 1->Obj.magic
    let colorBuffer = 2->Obj.magic
    let indexBuffer = 3->Obj.magic
    let array_buffer = 10->Obj.magic
    let element_array_buffer = 11->Obj.magic
    let dynamic_draw = 15->Obj.magic
    let createBufferStub = ref(Obj.magic(1))
    let bindBUfferStub = ref(Obj.magic(1))
    let bindBufferStub = ref(Obj.magic(1))
    let getArrayBufferStub = ref(Obj.magic(1))
    let bufferFloat32DataStub = ref(Obj.magic(1))
    let getDynamicDrawStub = ref(Obj.magic(1))
    let getElementArrayBufferStub = ref(Obj.magic(1))
    let bufferUint16DataStub = ref(Obj.magic(1))

    _prepare(given)

    \"and"("prepare webgl1 service", () => {
      createBufferStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      createBufferStub.contents->onCall(0, _)->returns(positionBuffer, _)->ignore
      createBufferStub.contents->onCall(1, _)->returns(colorBuffer, _)->ignore
      createBufferStub.contents->onCall(2, _)->returns(indexBuffer, _)->ignore

      bindBufferStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      bufferFloat32DataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      bufferUint16DataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      getArrayBufferStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(array_buffer, _)
      getElementArrayBufferStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(element_array_buffer, _)
      getDynamicDrawStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(dynamic_draw, _)

      webgl1Service :=
        WebGL1ServiceTool.buildService(
          ~sandbox,
          ~createBuffer=createBufferStub.contents->Obj.magic,
          ~bindBuffer=bindBufferStub.contents->Obj.magic,
          ~bufferFloat32Data=bufferFloat32DataStub.contents->Obj.magic,
          ~bufferUint16Data=bufferUint16DataStub.contents->Obj.magic,
          ~getArrayBuffer=getArrayBufferStub.contents->Obj.magic,
          ~getElementArrayBuffer=getElementArrayBufferStub.contents->Obj.magic,
          ~getDynamicDraw=getDynamicDrawStub.contents->Obj.magic,
          (),
        )
    })

    \"when"("init", () => {
      state := MainTool.init(~sandbox, ~webgl1Service=webgl1Service.contents, ())
    })

    then("create and init position buffer", () => {
      (
        bindBufferStub.contents->withTwoArgs(array_buffer, positionBuffer, _)->getCallCount,
        bufferFloat32DataStub.contents->getCall(0, _)->getArgs,
      )->expect ==
        (
          1,
          list{array_buffer, Float32Array.make([])->Obj.magic, dynamic_draw, Js.Nullable.undefined},
        )
    })

    \"and"("create and init color buffer", () => {
      (
        bindBufferStub.contents->withTwoArgs(array_buffer, colorBuffer, _)->getCallCount,
        bufferFloat32DataStub.contents->getCall(1, _)->getArgs,
      )->expect ==
        (
          1,
          list{array_buffer, Float32Array.make([])->Obj.magic, dynamic_draw, Js.Nullable.undefined},
        )
    })

    \"and"("create and init index buffer", () => {
      (
        bindBufferStub.contents->withTwoArgs(element_array_buffer, indexBuffer, _)->getCallCount,
        bufferUint16DataStub.contents->getCall(0, _)->getArgs,
      )->expect ==
        (
          1,
          list{
            element_array_buffer,
            Uint16Array.make([])->Obj.magic,
            dynamic_draw,
            Js.Nullable.undefined,
          },
        )
    })
  })
})
