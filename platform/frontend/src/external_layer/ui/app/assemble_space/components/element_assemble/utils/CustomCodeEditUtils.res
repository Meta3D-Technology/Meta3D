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

  let getNewCode = (
    dispatch,
    getNameFunc,
    setCurrentCustomNameToGlobalFunc,
    buildUpdateActionFunc,
    name,
    newCode,
  ) => {
    let newCode = newCode->CodeEditUtils.convertToNewCode

    let newName = newCode->getNameFunc->Meta3dCommonlib.OptionSt.getWithDefault(name)

    setCurrentCustomNameToGlobalFunc(newName)

    dispatch(
      buildUpdateActionFunc(name, newName, newCode),
    )
  }

  let getCode = (name, customs) => {
    (
      customs
      ->Meta3dCommonlib.ListSt.find((custom: CommonType.custom) => {
        custom.name == name
      })
      ->Meta3dCommonlib.OptionSt.getExn
    ).fileStr->_convertCodeToES6
  }
}

@react.component
let make = (
  ~service: service,
  ~getCurrentCustomNameFromGlobalFunc,
  ~getNameFunc,
  ~setCurrentCustomNameToGlobalFunc,
  ~buildUpdateActionFunc,
  ~currentCustomName,
  ~customs,
) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (code, setCode) = service.react.useState(_ => "")

  service.react.useEffect1(. () => {
    setCode(_ => Method.getCode(currentCustomName, customs))

    None
  }, [currentCustomName])

  <CodeEdit
    service
    code={code}
    getNewCodeFunc={newCode =>
      Method.getNewCode(
        dispatch,
        getNameFunc,
        setCurrentCustomNameToGlobalFunc,
        buildUpdateActionFunc,
        // TODO refactor: use useStore instead
        getCurrentCustomNameFromGlobalFunc()->Meta3dCommonlib.NullableSt.getExn,
        newCode,
      )}
  />
}
