open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let getNewCode = (
    dispatch,
    getNameFunc,
    setCurrentCustomNameToGlobalFunc,
    buildUpdateActionFunc,
    name,
    newOriginCode,
    newTranspiledCode,
  ) => {
    let newTranspiledCode = newTranspiledCode->CodeEditUtils.convertTranspliedCodeToUMDCode

    let newName = newTranspiledCode->getNameFunc->Meta3dCommonlib.OptionSt.getWithDefault(name)

    setCurrentCustomNameToGlobalFunc(newName)

    dispatch(
      buildUpdateActionFunc(
        name,
        newName,
        newOriginCode,
        newTranspiledCode->Some,
      ),
    )
  }

  let getCode = (name, customs) => {
    (
      customs
      ->Meta3dCommonlib.ListSt.find((custom: CommonType.custom) => {
        custom.name == name
      })
      ->Meta3dCommonlib.OptionSt.getExn
    ).originFileStr
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
    getNewCodeFunc={(newOriginCode, newTranspiledCode) =>
      Method.getNewCode(
        dispatch,
        getNameFunc,
        setCurrentCustomNameToGlobalFunc,
        buildUpdateActionFunc,
        // TODO refactor: use useStore instead
        getCurrentCustomNameFromGlobalFunc()->Meta3dCommonlib.NullableSt.getExn,
        newOriginCode,
        newTranspiledCode,
      )}
  />
}
