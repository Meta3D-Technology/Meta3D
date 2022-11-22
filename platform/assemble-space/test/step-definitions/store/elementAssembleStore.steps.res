open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/store/elementAssembleStore.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let id1 = ref(Obj.magic(1))
  let store = ref(Obj.magic(1))
  let rect = UIControlInspectorTool.buildRect()

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
    })
  }

  test(."set rect of hierachy ui control", ({given, \"when", \"and", then}) => {
    let id2 = ref(Obj.magic(1))
    let rect = UIControlInspectorTool.buildRect(
      ~x=11->FrontendUtils.ElementAssembleStoreType.IntForRectField,
      (),
    )

    _prepare(given)

    given("init store", () => {
      store := ElementAssembleStore.initialState
    })

    \"and"("select ui control u2 whose parent is u1 with id2", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SelectUIControl(
            "",
            "",
            "",
            Obj.magic(1),
            None,
            [],
          ),
        )

      id1 :=
        (
          store.contents.selectedUIControls
          ->Meta3dCommonlib.ListSt.head
          ->Meta3dCommonlib.OptionSt.getExn
        ).id

      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SelectUIControl(
            "",
            "",
            "",
            Obj.magic(1),
            id1.contents->Some,
            [],
          ),
        )

      id2 :=
        (
          (
            store.contents.selectedUIControls
            ->Meta3dCommonlib.ListSt.head
            ->Meta3dCommonlib.OptionSt.getExn
          ).children
          ->Meta3dCommonlib.ListSt.head
          ->Meta3dCommonlib.OptionSt.getExn
        ).id
    })

    \"when"("set rect with id2", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SetRect(id2.contents, rect),
        )
    })

    then("should set rect", () => {
      store.contents.selectedUIControlInspectorData->expect ==
        list{
          UIControlInspectorTool.buildUIControlInspectorData(
            ~id=id1.contents,
            ~x=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
            ~y=0->FrontendUtils.ElementAssembleStoreType.IntForRectField,
            ~width=20->FrontendUtils.ElementAssembleStoreType.IntForRectField,
            ~height=20->FrontendUtils.ElementAssembleStoreType.IntForRectField,
            ~children=list{
              UIControlInspectorTool.buildUIControlInspectorData(
                ~id=id2.contents,
                ~x=rect.x,
                ~y=rect.y,
                ~width=rect.width,
                ~height=rect.height,
                ~children=list{},
                (),
              ),
            },
            (),
          ),
        }
    })
  })

  let _prepareForSetAction = (given, \"and") => {
    given("init store", () => {
      store := ElementAssembleStore.initialState
    })

    \"and"("select ui control u1 with id1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SelectUIControl(
            "",
            "",
            "",
            Obj.magic(1),
            None,
            [],
          ),
        )

      id1 :=
        (
          store.contents.selectedUIControls
          ->Meta3dCommonlib.ListSt.head
          ->Meta3dCommonlib.OptionSt.getExn
        ).id
    })

    \"and"("set rect with id1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SetRect(id1.contents, rect),
        )
    })
  }

  test(."set action", ({given, \"when", \"and", then}) => {
    let eventName = #click
    let actionName = "a1"

    _prepare(given)

    _prepareForSetAction(given, \"and")

    \"when"("set action with id1, event data1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SetAction(
            id1.contents,
            (eventName, actionName->Some),
          ),
        )
    })

    then("should add event data1", () => {
      store.contents.selectedUIControlInspectorData->expect ==
        list{
          UIControlInspectorTool.buildUIControlInspectorData(
            ~id=id1.contents,
            ~event=[UIControlInspectorTool.buildEventData(eventName, actionName)],
            (),
          ),
        }
    })
  })

  test(."set action with empty action name", ({given, \"when", \"and", then}) => {
    let eventName = #click

    _prepare(given)

    _prepareForSetAction(given, \"and")

    given("set action with id1, event data1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SetAction(id1.contents, (eventName, "a1"->Some)),
        )
    })

    \"when"("set action with id1, event data1 with empty action name", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SetAction(id1.contents, (eventName, None)),
        )
    })

    then("should remove the event data of id1", () => {
      store.contents.selectedUIControlInspectorData->expect ==
        list{UIControlInspectorTool.buildUIControlInspectorData(~id=id1.contents, ~event=[], ())}
    })
  })

  let _prepareForSelectUIControl = given => {
    given("init store", () => {
      store := ElementAssembleStore.initialState
    })
  }

  test(."select hierachy ui control", ({given, \"when", \"and", then}) => {
    let id2 = ref(Obj.magic(1))

    _prepare(given)

    _prepareForSelectUIControl(given)

    given("select ui control u1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SelectUIControl(
            "",
            "",
            "",
            Obj.magic(1),
            None,
            [],
          ),
        )

      id1 :=
        (
          store.contents.selectedUIControls
          ->Meta3dCommonlib.ListSt.head
          ->Meta3dCommonlib.OptionSt.getExn
        ).id
    })

    \"and"("select ui control u2 whose parent is u1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SelectUIControl(
            "",
            "",
            "",
            Obj.magic(1),
            id1.contents->Some,
            [],
          ),
        )

      id2 :=
        (
          (
            store.contents.selectedUIControls
            ->Meta3dCommonlib.ListSt.head
            ->Meta3dCommonlib.OptionSt.getExn
          ).children
          ->Meta3dCommonlib.ListSt.head
          ->Meta3dCommonlib.OptionSt.getExn
        ).id
    })

    \"when"("select ui control u3 whose parent is u2", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SelectUIControl(
            "",
            "",
            "",
            Obj.magic(1),
            id2.contents->Some,
            [],
          ),
        )
    })

    then("should has correct selected ui controls", () => {
      (
        (
          store.contents.selectedUIControls
          ->Meta3dCommonlib.ListSt.head
          ->Meta3dCommonlib.OptionSt.getExn
        ).children
        ->Meta3dCommonlib.ListSt.head
        ->Meta3dCommonlib.OptionSt.getExn
      ).children
      ->Meta3dCommonlib.ListSt.length
      ->expect == 1
    })
  })

  let _prepareForSelectSelectedUIControl = (given, \"and") => {
    given("init store", () => {
      store := ElementAssembleStore.initialState
    })

    \"and"("select ui control u1 which has children with id1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SelectUIControl(
            "",
            "",
            "",
            Obj.magic(1),
            None,
            [],
          ),
        )

      id1 :=
        (
          store.contents.selectedUIControls
          ->Meta3dCommonlib.ListSt.head
          ->Meta3dCommonlib.OptionSt.getExn
        ).id
    })
  }

  test(."select selected ui control which has children", ({given, \"when", \"and", then}) => {
    _prepare(given)

    _prepareForSelectSelectedUIControl(given, \"and")

    \"when"("select u1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SelectSelectedUIControl(
            (
              createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(true, _)->Obj.magic,
              createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
            ),
            id1.contents,
          ),
        )
    })

    then("should use id1 as u1's parent ui control id", () => {
      store.contents.parentUIControlId->expect == id1.contents->Some
    })
  })

  test(."select selected ui control which not has children", ({given, \"when", \"and", then}) => {
    let id2 = ref(Obj.magic(1))

    _prepare(given)

    _prepareForSelectSelectedUIControl(given, \"and")

    given("select ui control u2 which not has children and its parent is u1 with id2", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SelectUIControl(
            "",
            "",
            "",
            Obj.magic(1),
            id1.contents->Some,
            [],
          ),
        )

      id2 :=
        (
          (
            store.contents.selectedUIControls
            ->Meta3dCommonlib.ListSt.head
            ->Meta3dCommonlib.OptionSt.getExn
          ).children
          ->Meta3dCommonlib.ListSt.head
          ->Meta3dCommonlib.OptionSt.getExn
        ).id
    })

    \"when"("select u2", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SelectSelectedUIControl(
            (
              createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(false, _)->Obj.magic,
              createEmptyStub(refJsObjToSandbox(sandbox.contents))->Obj.magic,
            ),
            id2.contents,
          ),
        )
    })

    then("should use id1 as u2's parent ui control id", () => {
      store.contents.parentUIControlId->expect == id1.contents->Some
    })
  })
})
