open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/redo_undo.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let s1: ref<Meta3dUiProtocol.StateType.state> = ref(Obj.magic(1))
  let ms1 = ref(Obj.magic(1))
  let ms2 = ref(Obj.magic(1))
  let eventExtensionProtocolName = "meta3d-event-protocol"
  let uiExtensionProtocolName = "meta3d-ui-protocol"

  let _buildActionContribute = (
    ~deepCopy,
    ~restore=((_, targetActionState) => targetActionState)->Js.Nullable.return,
    (),
  ) =>
    {
      "restore": restore,
      "deepCopy": deepCopy,
    }

  let _prepare = given => {
    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })
  }

  let _createMeta3dState = () => {
    Meta3dCommonlib.ImmutableHashMap.createEmpty()
  }

  let _getExtensionState = (meta3dState, extensionProtocolName) => {
    meta3dState->Obj.magic->Meta3dCommonlib.ImmutableHashMap.getExn(extensionProtocolName)
  }

  let _setExtensionState = (meta3dState, extensionProtocolName, extensionState) => {
    meta3dState
    ->Obj.magic
    ->Meta3dCommonlib.ImmutableHashMap.set(extensionProtocolName, extensionState)
  }

  let _prepareState = (given, \"and") => {
    given("create state s1", () => {
      s1 := MainTool.createState()
    })

    \"and"("create meta3d state ms1 which has s1", () => {
      ms1 := _createMeta3dState()->_setExtensionState(uiExtensionProtocolName, s1.contents)
    })
  }

  test(."if action has restore func, restore action state", ({given, \"and", \"when", then}) => {
    let elementName1 = "e1"
    let elementState1 = ref(Obj.magic(1))
    let a1Name = "a1"
    let as1 = {
      "data1": [],
    }
    let getExtensionServiceStub = ref(Obj.magic(1))
    let getExtensionStateStub = ref(Obj.magic(1))
    let setExtensionStateStub = ref(Obj.magic(1))

    _prepare(given)

    _prepareState(given, \"and")

    given(
      "register element1 with elementState1 which has action a1's state as as1",
      () => {
        elementState1 :=
          {
            "a1": as1,
          }

        s1 :=
          MainTool.registerElement(
            ~state=s1.contents,
            ~elementName=elementName1,
            ~elementFunc=Obj.magic(1),
            ~elementState=elementState1.contents->Obj.magic,
            (),
          )
        ms1 := _setExtensionState(ms1.contents, uiExtensionProtocolName, s1.contents)
      },
    )

    \"and"(
      "prepare api",
      () => {
        let a1 = _buildActionContribute(
          ~deepCopy=actionState =>
            {
              "data1": actionState["data1"]->Meta3dCommonlib.ArraySt.copy,
              //   "data1": actionState["data1"],
            }->Js.Nullable.return,
          (),
        )

        let eventService = {
          "getAllActionContributes": createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            [(a1Name, a1)],
            _,
          ),
        }

        ms1 := _setExtensionState(ms1.contents, eventExtensionProtocolName, Obj.magic(1))

        getExtensionServiceStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(eventService, _)

        // getExtensionStateStub :=
        //   createEmptyStub(refJsObjToSandbox(sandbox.contents))
        //   ->withTwoArgs(ms1.contents, uiExtensionProtocolName, _)
        //   ->returns(
        //     s1.contents,
        //     //   ->withTwoArgs(_, uiExtensionProtocolName, _)

        //     //   ->onCall(0, _)
        //     _,
        //   )
      },
    )

    \"and"(
      "deep copy ms1 as ms2",
      () => {
        ms2 :=
          MainTool.deepCopy(
            ~sandbox,
            ~meta3dState=ms1.contents->Obj.magic,
            ~getExtensionService=getExtensionServiceStub.contents->Obj.magic,
            // ~getExtensionState=getExtensionStateStub.contents->Obj.magic,
            ~getExtensionState=_getExtensionState->Obj.magic,
            ~setExtensionState=_setExtensionState->Obj.magic,
            (),
          )
      },
    )

    \"and"(
      "change as1's state to as2 with ms2",
      () => {
        let elementState1InMs2 =
          MainTool.getCurrentElementState(
            _getExtensionState(ms2.contents, uiExtensionProtocolName),
          )->Obj.magic

        let as1InMs2 = elementState1InMs2["a1"]->Obj.magic

        as1InMs2["data1"]->Obj.magic->Meta3dCommonlib.ArraySt.push(1)->ignore

        // Js.log(as1InMs2 ["data1"])
        // Js.log(as1)
      },
    )

    \"when"(
      "restore ms2 to ms1",
      () => {
        // getExtensionStateStub :=
        //   createEmptyStub(refJsObjToSandbox(sandbox.contents))
        //   ->withTwoArgs(ms2.contents, uiExtensionProtocolName, _)
        //   ->returns(s2.contents, _)
        //   ->withTwoArgs(ms1.contents, uiExtensionProtocolName, _)
        //   ->returns(s1.contents, _)

        let _ = MainTool.restore(
          ~sandbox,
          ~currentMeta3dState=ms2.contents->Obj.magic,
          ~targetMeta3dState=ms1.contents->Obj.magic,
          ~getExtensionService=getExtensionServiceStub.contents->Obj.magic,
          //   ~getExtensionState=getExtensionStateStub.contents->Obj.magic,
          ~getExtensionState=_getExtensionState->Obj.magic,
          ~setExtensionState=_setExtensionState->Obj.magic,
          (),
        )
      },
    )

    then(
      "a1's state should be as1",
      () => {
        as1["data1"]->expect == []
      },
    )
  })

  test(."if action not has restore func, not restore action state", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    // let resultMs = ref(Obj.magic(1))
    let elementName1 = "e1"
    let elementState1 = ref(Obj.magic(1))
    let a1Name = "a1"
    let as1 = {
      "data1": [],
    }
    let getExtensionServiceStub = ref(Obj.magic(1))
    let getExtensionStateStub = ref(Obj.magic(1))
    let setExtensionStateStub = ref(Obj.magic(1))

    _prepare(given)

    _prepareState(given, \"and")

    given(
      "register element1 with elementState1 which has action a1's state as as1",
      () => {
        elementState1 :=
          {
            "a1": as1,
          }

        s1 :=
          MainTool.registerElement(
            ~state=s1.contents,
            ~elementName=elementName1,
            ~elementFunc=Obj.magic(1),
            ~elementState=elementState1.contents->Obj.magic,
            (),
          )
        ms1 := _setExtensionState(ms1.contents, uiExtensionProtocolName, s1.contents)
      },
    )

    \"and"(
      "prepare api",
      () => {
        let a1 = _buildActionContribute(
          ~deepCopy=Meta3dCommonlib.NullableSt.getEmpty(),
          ~restore=Meta3dCommonlib.NullableSt.getEmpty(),
          (),
        )

        let eventService = {
          "getAllActionContributes": createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            [(a1Name, a1)],
            _,
          ),
        }

        ms1 := _setExtensionState(ms1.contents, eventExtensionProtocolName, Obj.magic(1))

        getExtensionServiceStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(eventService, _)
      },
    )

    \"and"(
      "deep copy ms1 as ms2",
      () => {
        ms2 :=
          MainTool.deepCopy(
            ~sandbox,
            ~meta3dState=ms1.contents->Obj.magic,
            ~getExtensionService=getExtensionServiceStub.contents->Obj.magic,
            // ~getExtensionState=getExtensionStateStub.contents->Obj.magic,
            ~getExtensionState=_getExtensionState->Obj.magic,
            ~setExtensionState=_setExtensionState->Obj.magic,
            (),
          )
      },
    )

    \"and"(
      "change as1's state to as2 with ms2",
      () => {
        let elementState1InMs2 =
          MainTool.getCurrentElementState(
            _getExtensionState(ms2.contents, uiExtensionProtocolName),
          )->Obj.magic

        let as1InMs2 = elementState1InMs2["a1"]->Obj.magic

        as1InMs2["data1"]->Obj.magic->Meta3dCommonlib.ArraySt.push(1)->ignore

        // Js.log(as1InMs2 ["data1"])
        // Js.log(as1)
      },
    )

    \"when"(
      "restore ms2 to ms1",
      () => {
        // resultMs :=
        let _ = MainTool.restore(
          ~sandbox,
          ~currentMeta3dState=ms2.contents->Obj.magic,
          ~targetMeta3dState=ms1.contents->Obj.magic,
          ~getExtensionService=getExtensionServiceStub.contents->Obj.magic,
          //   ~getExtensionState=getExtensionStateStub.contents->Obj.magic,
          ~getExtensionState=_getExtensionState->Obj.magic,
          ~setExtensionState=_setExtensionState->Obj.magic,
          (),
        )
      },
    )

    then(
      "a1's state should be as2",
      () => {
        as1["data1"]->expect == [1]

        // (
        //   (
        //     MainTool.getCurrentElementState(
        //       _getExtensionState(resultMs.contents, uiExtensionProtocolName),
        //     )->Obj.magic
        //   )["a1"]->Obj.magic
        // )["data1"]->expect == [1]
      },
    )
  })

  test(."not restore ui control state", ({given, \"and", \"when", then}) => {
    let resultMs = ref(Obj.magic(1))
    let c1Label = "c1"
    let cs1 = {
      "data1": [],
    }
    let elementName1 = "e1"
    let elementState1 = ref(Obj.magic(1))
    let getExtensionServiceStub = ref(Obj.magic(1))
    let getExtensionStateStub = ref(Obj.magic(1))
    let setExtensionStateStub = ref(Obj.magic(1))

    _prepare(given)

    _prepareState(given, \"and")

    given(
      "add ui control c1's state as cs1 to s1",
      () => {
        s1 := MainTool.setUIControlState(s1.contents, c1Label, cs1->Obj.magic)
      },
    )

    \"and"(
      "register element1 with elementState1",
      () => {
        elementState1 := Obj.magic(1)

        s1 :=
          MainTool.registerElement(
            ~state=s1.contents,
            ~elementName=elementName1,
            ~elementFunc=Obj.magic(1),
            ~elementState=elementState1.contents->Obj.magic,
            (),
          )
        ms1 := _setExtensionState(ms1.contents, uiExtensionProtocolName, s1.contents)
      },
    )

    \"and"(
      "prepare api",
      () => {
        let eventService = {
          "getAllActionContributes": createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            [],
            _,
          ),
        }

        ms1 := _setExtensionState(ms1.contents, eventExtensionProtocolName, Obj.magic(1))

        getExtensionServiceStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(eventService, _)
      },
    )

    \"and"(
      "deep copy ms1 as ms2",
      () => {
        ms2 :=
          MainTool.deepCopy(
            ~sandbox,
            ~meta3dState=ms1.contents->Obj.magic,
            ~getExtensionService=getExtensionServiceStub.contents->Obj.magic,
            ~getExtensionState=_getExtensionState->Obj.magic,
            ~setExtensionState=_setExtensionState->Obj.magic,
            (),
          )
      },
    )

    \"and"(
      "change cs1's state to cs2 with ms2",
      () => {
        let cs1InMs2 =
          MainTool.getUIControlState(
            _getExtensionState(ms2.contents, uiExtensionProtocolName),
            c1Label,
          )->Obj.magic

        ms2 :=
          ms2.contents
          ->Obj.magic
          ->Meta3dCommonlib.ImmutableHashMap.set(
            uiExtensionProtocolName,
            MainTool.setUIControlState(
              _getExtensionState(ms2.contents, uiExtensionProtocolName),
              c1Label,
              {
                "data1": cs1InMs2["data1"]
                ->Obj.magic
                ->Meta3dCommonlib.ArraySt.copy
                ->Meta3dCommonlib.ArraySt.push(1),
              }->Obj.magic,
            ),
          )
          ->Obj.magic
      },
    )

    \"when"(
      "restore ms2 to ms1",
      () => {
        resultMs :=
          MainTool.restore(
            ~sandbox,
            ~currentMeta3dState=ms2.contents->Obj.magic,
            ~targetMeta3dState=ms1.contents->Obj.magic,
            ~getExtensionService=getExtensionServiceStub.contents->Obj.magic,
            ~getExtensionState=_getExtensionState->Obj.magic,
            ~setExtensionState=_setExtensionState->Obj.magic,
            (),
          )
      },
    )

    then(
      "c1's state should be cs2",
      () => {
        (
          MainTool.getUIControlState(
            _getExtensionState(resultMs.contents, uiExtensionProtocolName),
            c1Label,
          )->Obj.magic
        )["data1"]->expect == [1]
      },
    )
  })
})
