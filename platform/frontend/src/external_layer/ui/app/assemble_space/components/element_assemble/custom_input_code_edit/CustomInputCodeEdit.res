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

  let _convertCodeToUMD = code => {
    code->Js.String.replace(
      "export let getContribute = (api) => {",
      {
        j`window.Contribute = {
    getContribute: (api) => {
`
      },
      _,
    ) ++ "}"
  }

  let _removeSemicolon = code => {
    code->Js.String.replaceByRe(%re("/\};/g"), "}", _)
  }

  let _getInputName = inputFileStr => {
    (
      inputFileStr
      ->Js.String.match_(%re("/inputName\:.*\"(.+)\",/im"), _)
      ->Meta3dCommonlib.OptionSt.getExn
    )[1]->Meta3dCommonlib.OptionSt.getExn
  }

  let getNewCode = (dispatch, inputName, newCode) => {
    let newCode = newCode->_convertCodeToUMD->_removeSemicolon

    let newInputName = newCode->_getInputName

    CodeEditUtils.setCurrentCustomInputNameToGlobal(newInputName)

    dispatch(
      ElementAssembleStoreType.UpdateCustomInputFileStr(
        inputName,
        newInputName,
        newCode,
      ),
    )
  }

  let getCode = (inputName, customInputs) => {
    (
      customInputs
      ->Meta3dCommonlib.ListSt.find((
        {name, fileStr}: ElementAssembleStoreType.customInput,
      ) => {
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
