open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let _isNameExist = (name, customs) => {
    customs
    ->Meta3dCommonlib.ListSt.find((custom: CommonType.custom) => {
      custom.name == name
    })
    ->Meta3dCommonlib.OptionSt.isSome
  }

  let getNewCode = (
    service: service,
    dispatch,
    getNameFunc,
    setCurrentCustomNameToGlobalFunc,
    buildUpdateActionFunc,
    name,
    newOriginCode,
    newTranspiledCode,
    customs,
  ) => {
    let newTranspiledCode = newTranspiledCode->CodeEditUtils.convertTranspliedCodeToUMDCode

    let newName = newTranspiledCode->getNameFunc->Meta3dCommonlib.OptionSt.getWithDefault(name)

    _isNameExist(newName, customs)
      ? service.console.warn(. {j`name:${newName}已经存在，请换个name`}, None)
      : {
          setCurrentCustomNameToGlobalFunc(newName)

          dispatch(buildUpdateActionFunc(name, newName, newOriginCode, newTranspiledCode->Some))
        }
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

  let (code, setCode) = service.react.useState(_ => None)

  service.react.useEffect1(. () => {
    setCode(_ => Method.getCode(currentCustomName, customs))

    None
  }, [currentCustomName])

  {
    switch code {
    | None => React.string(`不支持编辑`)
    | Some(code) =>
      <CodeEdit
        service
        code={code}
        getNewCodeFunc={(newOriginCode, newTranspiledCode) =>
          Method.getNewCode(
            service,
            dispatch,
            getNameFunc,
            setCurrentCustomNameToGlobalFunc,
            buildUpdateActionFunc,
            // TODO refactor: use useStore instead
            getCurrentCustomNameFromGlobalFunc()->Meta3dCommonlib.NullableSt.getExn,
            newOriginCode,
            newTranspiledCode,
            customs,
          )}
      />
    }
  }
}
