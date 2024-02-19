open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let _updateCustomFileStr = (dispatch, handleNameExistFunc) => {
    CodeEditUtils.setCurrentCustomNameToGlobal()

    dispatch(ElementAssembleStoreType.UpdateCustomFileStr(handleNameExistFunc))

    CodeEditUtils.setChangeCodeDataToGlobal(Meta3dCommonlib.NullableSt.getEmpty())
  }

  let getNewCode = (
    service: service,
    dispatch,
    getNameFunc,
    setCurrentCustomNameToGlobalFunc,
    type_,
    name,
    newOriginCode,
    newTranspiledCode,
  ) => {
    let newTranspiledCode = newTranspiledCode->CodeEditUtils.convertTranspliedCodeToUMDCode

    let newName = newTranspiledCode->getNameFunc->Meta3dCommonlib.OptionSt.getWithDefault(name)

    // TODO need restore(should not set to global, set to store instead) after fix useSelector

    // dispatch(
    //   ElementAssembleStoreType.SetChangeCode(
    //     ElementAssembleStoreType.Change(
    //       type_,
    //       name,
    //       newName,
    //       newOriginCode,
    //       newTranspiledCode->Some,
    //     ),
    //   ),
    // )
    CodeEditUtils.setChangeCodeDataToGlobal((
      type_,
      name,
      newName,
      newOriginCode,
      newTranspiledCode->Some,
    ))

    CodeEditUtils.addUpdateCustomFileStrTimerToGlobal(() =>
      _updateCustomFileStr(dispatch, () => {
        service.console.warn(. {j`name:${newName}已经存在，请换个name`}, None)

        CodeEditUtils.setChangeCodeDataToGlobal(Meta3dCommonlib.NullableSt.getEmpty())
      })
    )
  }

  let useSelector = ({elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {currentCode} = elementAssembleState

    currentCode
  }
}

@react.component
let make = (
  ~service: service,
  ~getCurrentCustomNameFromGlobalFunc,
  ~getNameFunc,
  ~setCurrentCustomNameToGlobalFunc,
  // ~buildUpdateActionFunc,
  ~currentCustomName,
  // ~customs,
  ~type_,
) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let currentCode = service.react.useSelector(. Method.useSelector)

  // let eventEmitter = service.react.useAllSelector(. Method.useSelector)

  // let (code, setCode) = service.react.useState(_ => UnEditable)

  // service.react.useEffect1(. () => {
  //   setCode(_ => Method.getCode(currentCustomName, customs))

  //   None
  // }, [currentCustomName])

  // service.react.useEffectOnce(() => {
  //   eventEmitter.addListener(.EventUtils.getSelectActionInActionsEventName(), _ => {
  //     setCode(_ => Method.markCodeNeedDispatch(code))
  //   })
  //   eventEmitter.addListener(.EventUtils.getSelectInputInInputsEventName(), _ => {
  //     setCode(_ => Method.markCodeNeedDispatch(code))
  //   })

  //   ((), None)
  // })

  {
    switch currentCode {
    | ElementAssembleStoreType.UnEditable => React.string(`不支持编辑`)
    | ElementAssembleStoreType.Origin(code) =>
      <CodeEdit
        service
        code={code}
        getNewCodeFunc={(newOriginCode, newTranspiledCode) =>
          Method.getNewCode(
            service,
            dispatch,
            getNameFunc,
            setCurrentCustomNameToGlobalFunc,
            // buildUpdateActionFunc,
            // TODO refactor: use useStore instead
            type_,
            getCurrentCustomNameFromGlobalFunc()->Meta3dCommonlib.NullableSt.getExn,
            newOriginCode,
            newTranspiledCode,
            // customs,
          )}
      />
    | _ => React.null
    }
  }
}
