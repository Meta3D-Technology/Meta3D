open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let _convertCodeToES6 = code => {
    code
    ->Js.String.slice(~from=0, ~to_=code->Js.String.length - 1, _)
    ->Js.String.replace({j`window.Contribute = {`}, "", _)
    ->Js.String.replace(
      {j`    getContribute: (api) => {`},
      {
        j`import { api } from "meta3d-type"

export let getContribute = (api:api) => {`
      },
      _,
    )
  }

  let getNewCode = (dispatch, actionName, newCode) => {
    let newCode = newCode->CodeEditUtils.convertToNewCode

    let newActionName =
      newCode->CustomUtils.getActionName->Meta3dCommonlib.OptionSt.getWithDefault(actionName)

    CodeEditUtils.setCurrentCustomActionNameToGlobal(newActionName)

    dispatch(ElementAssembleStoreType.UpdateCustomActionFileStr(actionName, newActionName, newCode))
  }

  let getCode = (actionName, customActions) => {
    (
      customActions
      ->Meta3dCommonlib.ListSt.find(({name, fileStr}: ElementAssembleStoreType.customAction) => {
        name == actionName
      })
      ->Meta3dCommonlib.OptionSt.getExn
    ).fileStr->_convertCodeToES6
  }

  let useSelector = ({elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {customActions} = elementAssembleState

    customActions
  }
}

@react.component
let make = (~service: service, ~currentCustomActionName) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (code, setCode) = service.react.useState(_ => "")

  let customActions = service.react.useSelector(. Method.useSelector)

  service.react.useEffect1(. () => {
    setCode(_ => Method.getCode(currentCustomActionName, customActions))

    None
  }, [currentCustomActionName])

  <CodeEdit
    service
    code={code}
    getNewCodeFunc={newCode =>
      Method.getNewCode(
        dispatch,
        // TODO refactor: use useStore instead
        CodeEditUtils.getCurrentCustomActionNameFromGlobal()->Meta3dCommonlib.NullableSt.getExn,
        newCode,
      )}
  />
}
