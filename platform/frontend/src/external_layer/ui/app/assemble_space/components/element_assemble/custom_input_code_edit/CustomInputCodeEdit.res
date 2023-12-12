open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let _convertCodeToES6 = code => {
    code
    ->Js.String.slice(~from=0, ~to_=code->Js.String.length - 1, _)
    ->Js.String.replace({j`window.Contribute = {`}, "", _)
    ->Js.String.replace(
      {j`getContribute: (api) => {`},
      {
        j`import { api } from "meta3d-type"

  export let getContribute = (api:api) => {`
      },
      _,
    )
  }


  let getNewCode = (dispatch, inputName, newCode) => {
    let newCode = newCode->CodeEditUtils. convertToNewCode

    let newInputName = newCode->CustomUtils.getInputName

    CodeEditUtils.setCurrentCustomInputNameToGlobal(newInputName)

    dispatch(ElementAssembleStoreType.UpdateCustomInputFileStr(inputName, newInputName, newCode))
  }

  let getCode = (inputName, customInputs) => {
    (
      customInputs
      ->Meta3dCommonlib.ListSt.find(({name, fileStr}: ElementAssembleStoreType.customInput) => {
        name == inputName
      })
      ->Meta3dCommonlib.OptionSt.getExn
    ).fileStr->_convertCodeToES6
  }

  let useSelector = ({elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {customInputs} = elementAssembleState

    customInputs
  }
}

@react.component
let make = (~service: service, ~currentCustomInputName) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (code, setCode) = service.react.useState(_ => "")

  let customInputs = service.react.useSelector(. Method.useSelector)

  service.react.useEffect1(. () => {
    setCode(_ => Method.getCode(currentCustomInputName, customInputs))

    None
  }, [currentCustomInputName])

  <CodeEdit
    service
    code={code}
    getNewCodeFunc={newCode =>
      Method.getNewCode(
        dispatch,
        // TODO refactor: use useStore instead
        CodeEditUtils.getCurrentCustomInputNameFromGlobal()->Meta3dCommonlib.NullableSt.getExn,
        newCode,
      )}
  />
}
