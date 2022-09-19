open Meta3d_jest

let _ = describe("ManageEventAPI", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  beforeEach(() => {
    sandbox := createSandbox()
    TestTool.prepareState()
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  // describe("test custom gameObject event", () => {
  //   describe("test bind", () => {
  //     test("test bind one gameObject", () => {
  //       let value = ref(0)
  //       let (state, gameObject) = GameObjectAPI.createGameObject(state.contents)

  //       let state = ManageEventAPI.onCustomGameObjectEvent(
  //         CustomEventTool.getPointDownEventName(),
  //         gameObject,
  //         0,
  //         (. event, state) => {
  //           value := 1
  //           (state, event)
  //         },
  //         state,
  //       )
  //       let state = ManageEventAPI.triggerCustomGameObjectEvent(
  //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  //         gameObject,
  //         state,
  //       )

  //       value.contents -> expect == 1
  //     })
  //     // test("test bind three gameObjects", () => {
  //     //   let value = ref(1)
  //     //   let (state, gameObject1) = GameObjectAPI.createGameObject(state.contents)
  //     //   let (state, gameObject2) = GameObjectAPI.createGameObject(state)
  //     //   let (state, gameObject3) = GameObjectAPI.createGameObject(state)

  //     //   let state = ManageEventAPI.onCustomGameObjectEvent(
  //     //     CustomEventTool.getPointDownEventName(),
  //     //     gameObject1,
  //     //     0,
  //     //     (. event, state) => {
  //     //       value := value.contents * 2
  //     //       (state, event)
  //     //     },
  //     //     state,
  //     //   )
  //     //   let state = ManageEventAPI.onCustomGameObjectEvent(
  //     //     CustomEventTool.getPointDownEventName(),
  //     //     gameObject2,
  //     //     0,
  //     //     (. event, state) => {
  //     //       value := value.contents * 3
  //     //       (state, event)
  //     //     },
  //     //     state,
  //     //   )
  //     //   let state = ManageEventAPI.onCustomGameObjectEvent(
  //     //     CustomEventTool.getPointDownEventName(),
  //     //     gameObject2,
  //     //     0,
  //     //     (. event, state) => {
  //     //       value := value.contents * 4
  //     //       (state, event)
  //     //     },
  //     //     state,
  //     //   )
  //     //   let (state, _) = ManageEventAPI.triggerCustomGameObjectEvent(
  //     //     CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  //     //     gameObject2,
  //     //     state,
  //     //   )
  //     //   let (state, _) = ManageEventAPI.triggerCustomGameObjectEvent(
  //     //     CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  //     //     gameObject3,
  //     //     state,
  //     //   )

  //     //   value.contents -> expect == 1 * 3 * 4
  //     // })
  //   })

  // //   describe("test unbind by handleFunc", () =>
  // //     test("test", () => {
  // //       let (state, gameObject) = GameObjectAPI.createGameObject(state.contents)
  // //       let value = ref(0)
  // //       let handleFunc = (. event, state) => {
  // //         value := value.contents + 1
  // //         (state, event)
  // //       }

  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject,
  // //         0,
  // //         handleFunc,
  // //         state,
  // //       )
  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject,
  // //         0,
  // //         (. event, state) => {
  // //           value := value.contents + 10
  // //           (state, event)
  // //         },
  // //         state,
  // //       )
  // //       let state = ManageEventAPI.offCustomGameObjectEventByHandleFunc(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject,
  // //         handleFunc,
  // //         state,
  // //       )
  // //       let (state, _) = ManageEventAPI.triggerCustomGameObjectEvent(
  // //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  // //         gameObject,
  // //         state,
  // //       )

  // //       value.contents -> expect == 10
  // //     })
  // //   )

  // //   describe("test unbind by target", () =>
  // //     test("test", () => {
  // //       let (state, gameObject1) = GameObjectAPI.createGameObject(state.contents)
  // //       let value = ref(0)
  // //       let handleFunc = (. event, state) => {
  // //         value := value.contents + 1
  // //         (state, event)
  // //       }

  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         0,
  // //         handleFunc,
  // //         state,
  // //       )
  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         0,
  // //         (. event, state) => {
  // //           value := value.contents + 10
  // //           (state, event)
  // //         },
  // //         state,
  // //       )
  // //       let state = ManageEventAPI.offCustomGameObjectEventByTarget(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         state,
  // //       )
  // //       let (state, _) = ManageEventAPI.triggerCustomGameObjectEvent(
  // //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  // //         gameObject1,
  // //         state,
  // //       )

  // //       value.contents -> expect == 0
  // //     })
  // //   )

  // //   describe("test priority", () =>
  // //     test("the higher priority handleFunc is executed first", () => {
  // //       let (state, gameObject1) = GameObjectAPI.createGameObject(state.contents)
  // //       let value = ref(2)

  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         1,
  // //         (. event, state) => {
  // //           value := value.contents - 3
  // //           (state, event)
  // //         },
  // //         state,
  // //       )
  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         0,
  // //         (. event, state) => {
  // //           value := value.contents * 2
  // //           (state, event)
  // //         },
  // //         state,
  // //       )
  // //       let (state, _) = ManageEventAPI.triggerCustomGameObjectEvent(
  // //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  // //         gameObject1,
  // //         state,
  // //       )

  // //       value.contents -> expect == -2
  // //     })
  // //   )

  // //   describe("test broadcast custom gameObject event", () =>
  // //     test("trigger gameObject's and its all children' custom event", () => {
  // //       let value = ref(0)
  // //       let (state, gameObject1) = GameObjectAPI.createGameObject(state.contents)
  // //       let (state, gameObject2) = GameObjectAPI.createGameObject(state)
  // //       let (state, gameObject3) = GameObjectAPI.createGameObject(state)

  // //       let state =
  // //         state
  // //         -> GameObjectTool.addChild(gameObject1, gameObject2)
  // //         -> GameObjectTool.addChild(gameObject2, gameObject3)

  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         0,
  // //         (. event, state) => {
  // //           value := value.contents + 1
  // //           (state, event)
  // //         },
  // //         state,
  // //       )
  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject2,
  // //         0,
  // //         (. event, state) => {
  // //           value := value.contents + 2
  // //           (state, event)
  // //         },
  // //         state,
  // //       )
  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject3,
  // //         0,
  // //         (. event, state) => {
  // //           value := value.contents + 3
  // //           (state, event)
  // //         },
  // //         state,
  // //       )
  // //       let state = ManageEventAPI.broadcastCustomGameObjectEvent(
  // //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  // //         gameObject1,
  // //         state,
  // //       )

  // //       value.contents -> expect == 0 + 1 + 2 + 3
  // //     })
  // //   )

  // //   describe("test emit custom gameObject event", () =>
  // //     test("trigger gameObject's and its all parents' custom event", () => {
  // //       let value = ref(2)
  // //       let (state, gameObject1) = GameObjectAPI.createGameObject(state.contents)
  // //       let (state, gameObject2) = GameObjectAPI.createGameObject(state)
  // //       let (state, gameObject3) = GameObjectAPI.createGameObject(state)

  // //       let state =
  // //         state
  // //         -> GameObjectTool.addChild(gameObject1, gameObject2)
  // //         -> GameObjectTool.addChild(gameObject2, gameObject3)

  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         0,
  // //         (. event, state) => {
  // //           value := value.contents + 1
  // //           (state, event)
  // //         },
  // //         state,
  // //       )
  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject2,
  // //         0,
  // //         (. event, state) => {
  // //           value := value.contents + 2
  // //           (state, event)
  // //         },
  // //         state,
  // //       )
  // //       let state = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject3,
  // //         0,
  // //         (. event, state) => {
  // //           value := value.contents * 3
  // //           (state, event)
  // //         },
  // //         state,
  // //       )
  // //       let state = ManageEventAPI.emitCustomGameObjectEvent(
  // //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  // //         gameObject3,
  // //         state,
  // //       )

  // //       value.contents -> expect == 2 * 3 + 2 + 1
  // //     })
  // //   )
  // // })

  describe("test stopPropagation", () => {
    // describe("test custom gameObject event", () =>
    //   test(
    //     "if stopPropagation, gameObject's less priority handleFunc shouldn't be executed",
    //     () => {
    //       let (state, gameObject1) = GameObjectAPI.createGameObject(state.contents)
    //       let value = ref(2)

    //       let state = ManageEventAPI.onCustomGameObjectEvent(
    //         CustomEventTool.getPointDownEventName(),
    //         gameObject1,
    //         1,
    //         (. event, state) => {
    //           value := value.contents - 3

    //           (state, ManageEventAPI.stopPropagationCustomEvent(event))
    //         },
    //         state,
    //       )
    //       let state = ManageEventAPI.onCustomGameObjectEvent(
    //         CustomEventTool.getPointDownEventName(),
    //         gameObject1,
    //         0,
    //         (. event, state) => {
    //           value := value.contents * 2
    //           (state, event)
    //         },
    //         state,
    //       )
    //       let (state, _) = ManageEventAPI.triggerCustomGameObjectEvent(
    //         CustomEventTool.createCustomEvent(
    //           ~eventName=CustomEventTool.getPointDownEventName(),
    //           (),
    //         ),
    //         gameObject1,
    //         state,
    //       )

    //       value.contents -> expect == -1
    //     },
    //   )
    // )

    describe("test custom global event", () =>
      test("if stopPropagation, less priority handleFunc shouldn't be executed", () => {
        let value = ref(2)

        ManageEventAPI.onCustomGlobalEvent(CustomEventTool.getPointDownEventName(), 1, (.
          event,
          state,
        ) => {
          value := value.contents - 3

          (state, ManageEventAPI.stopPropagationCustomEvent(event))
        })
        let state = ManageEventAPI.onCustomGlobalEvent(CustomEventTool.getPointDownEventName(), 0, (.
          event,
          state,
        ) => {
          value := value.contents * 2
          (state, event)
        })
        ManageEventAPI.triggerCustomGlobalEvent(
          CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
        )

        value.contents->expect == -1
      })
    )
  })
})
