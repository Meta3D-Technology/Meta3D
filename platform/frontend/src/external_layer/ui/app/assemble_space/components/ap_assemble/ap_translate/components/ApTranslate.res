open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let _extractSpecific = (handleValueFunc, name, selectedUIControlInspectorData) => {
    HierachyUtils.reduceAllSelectedUIControlData(
      [],
      (result, data: ElementAssembleStoreType.uiControlInspectorData) => {
        switch data.specific->Meta3dCommonlib.ArraySt.find(s => {
          s.name == name
        }) {
        | Some(s) =>
          result->Meta3dCommonlib.ArraySt.push(
            s.value->SpecificUtils.getSpecificDataValue->Obj.magic->handleValueFunc,
          )
        | None => result
        }
      },
      (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
      selectedUIControlInspectorData,
    )
  }

  let extractTranslate = (
    (setLabelStr, setItemsStr, setInputParamsStr),
    selectedUIControlInspectorData: ElementAssembleStoreType.selectedUIControlInspectorData,
  ) => {
    let labels = _extractSpecific(
      value => (value->Js.String.split("##", _))[0],
      "label",
      selectedUIControlInspectorData,
    )

    let items = _extractSpecific(value => value, "items", selectedUIControlInspectorData)

    let inputParams = HierachyUtils.reduceAllSelectedUIControlData(
      [],
      (result, data: ElementAssembleStoreType.uiControlInspectorData) => {
        switch data.input {
        | Some(i) => result->Meta3dCommonlib.ArraySt.push(i.inputParams)
        | None => result
        }
      },
      (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
      selectedUIControlInspectorData,
    )

    setLabelStr(_ => labels->Obj.magic->Js.Json.stringify)
    setItemsStr(_ => items->Obj.magic->Js.Json.stringify)
    setInputParamsStr(_ => inputParams->Obj.magic->Js.Json.stringify)
  }

  let _updateSpecific = (
    handleValueFunc,
    translatedValues,
    name,
    selectedUIControlInspectorData,
  ) => {
    let index = ref(0)

    HierachyUtils.mapAllSelectedUIControlData(
      (data: ElementAssembleStoreType.uiControlInspectorData) => {
        {
          ...data,
          specific: data.specific->Meta3dCommonlib.ArraySt.map(s => {
            s.name == name
              ? {
                  let newS = {
                    ...s,
                    value: SpecificUtils.convertStringToValue(
                      translatedValues[index.contents]->handleValueFunc(
                        s.value->SpecificUtils.getSpecificDataValue->Obj.magic,
                      ),
                      #string,
                    )->CommonType.SpecicFieldDataValue,
                  }

                  index := index.contents + 1

                  newS
                }
              : s
          }),
        }
      },
      (
        (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
        (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
          ...data,
          children,
        },
      ),
      selectedUIControlInspectorData,
    )
  }

  let updateTranslate = (
    dispatch,
    selectedUIControlInspectorData,
    labelStr,
    itemsStr,
    inputParamsStr,
  ) => {
    let translatedLabels = Js.Json.parseExn(labelStr)->Obj.magic
    let translatedItems = Js.Json.parseExn(itemsStr)->Obj.magic
    let translatedInputParams = Js.Json.parseExn(inputParamsStr)->Obj.magic

    let selectedUIControlInspectorData = _updateSpecific(
      (translatedValue, originValue) =>
        translatedValue ++ "##" ++ (originValue->Js.String.split("##", _))[1],
      translatedLabels,
      "label",
      selectedUIControlInspectorData,
    )

    let selectedUIControlInspectorData = _updateSpecific(
      (translatedValue, originValue) => translatedValue,
      translatedItems,
      "items",
      selectedUIControlInspectorData,
    )

    let index = ref(0)

    let selectedUIControlInspectorData = HierachyUtils.mapAllSelectedUIControlData(
      (data: ElementAssembleStoreType.uiControlInspectorData) => {
        {
          ...data,
          input: data.input->Meta3dCommonlib.OptionSt.map(i => {
            let newInput = {
              ...i,
              inputParams: (translatedInputParams->Obj.magic)[index.contents],
            }

            index := index.contents + 1

            newInput
          }),
        }
      },
      (
        (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
        (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
          ...data,
          children,
        },
      ),
      selectedUIControlInspectorData,
    )

    dispatch(
      ElementAssembleStoreType.UpdateSelectedUIControlInspectorData(selectedUIControlInspectorData),
    )

    MessageUtils.success("更新翻译成功", 5->Some)
  }

  let useSelector = ({userCenterState, assembleSpaceState, eventEmitter}: AppStoreType.state) => {
    let {elementAssembleState}: AssembleSpaceStoreType.state = assembleSpaceState

    let {selectedUIControlInspectorData} = elementAssembleState

    selectedUIControlInspectorData
  }
}

@react.component
let make = (~service: service) => {
  let (labelStr, setLabelStr) = service.react.useState(_ => "")
  let (itemsStr, setItemsStr) = service.react.useState(_ => "")
  let (inputParamsStr, setInputParamsStr) = service.react.useState(_ => "")

  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )

  let selectedUIControlInspectorData = service.react.useAllSelector(. Method.useSelector)

  <>
    <Button
      onClick={_ => {
        Method.extractTranslate(
          (setLabelStr, setItemsStr, setInputParamsStr),
          selectedUIControlInspectorData,
        )
      }}>
      {React.string(`提取翻译数据`)}
    </Button>
    {labelStr->Js.String.length > 0
      ? <>
          <Button
            onClick={_ => {
              MessageUtils.showCatchedErrorMessage(() => {
                Method.updateTranslate(
                  dispatchForElementAssembleStore,
                  selectedUIControlInspectorData,
                  labelStr,
                  itemsStr,
                  inputParamsStr,
                )
              }, 5->Some)
            }}>
            {React.string(`更新翻译`)}
          </Button>
          <Input.TextArea
            value={labelStr}
            onChange={e => {
              setLabelStr(_ => e->EventUtils.getEventTargetValue)
            }}
          />
          <Input.TextArea
            value={itemsStr}
            onChange={e => {
              setItemsStr(_ => e->EventUtils.getEventTargetValue)
            }}
          />
          <Input.TextArea
            value={inputParamsStr}
            onChange={e => {
              setInputParamsStr(_ => e->EventUtils.getEventTargetValue)
            }}
          />
        </>
      : React.null}
  </>
}
