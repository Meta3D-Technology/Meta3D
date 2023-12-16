open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let buildDefaultActionTranspiledFileStr = actionName => {
    j`window.Contribute = {
  getContribute: (api) => {
    return {
      actionName: "${actionName}",
      init: (meta3dState) => {
        let eventSourcingService = api.getPackageService(meta3dState, "meta3d-editor-whole-protocol").event(meta3dState).eventSourcing(meta3dState)

        return new Promise((resolve, reject) => {
          resolve(eventSourcingService.on(meta3dState, "", 0, (meta3dState) => {
            return Promise.resolve(meta3dState)
          }, (meta3dState) => {
            return Promise.resolve(meta3dState)
          }))
        })
      },
      handler: (meta3dState, uiData) => {
        return new Promise((resolve, reject) => {
          let eventSourcingService = api.getPackageService(meta3dState, "meta3d-editor-whole-protocol").event(meta3dState).eventSourcing(meta3dState)

          resolve(eventSourcingService.addEvent(meta3dState, {
            name: "",
            inputData: []
          }))
        })
      },
      createState: () => {
        return null
      }
    }
  }
}`
  }

  let buildDefaultActionOriginFileStr = actionName => {
    buildDefaultActionTranspiledFileStr(actionName)->CustomCodeUtils.convertCodeToES6
  }

  let useSelector = ({elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {customActions, currentCustomActionName} = elementAssembleState

    (customActions, currentCustomActionName)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (customActions, currentCustomActionName) = service.react.useSelector(. Method.useSelector)

  <CustomDomUtils
    service
    buildSelectActionFunc={key => ElementAssembleStoreType.SelectCustomAction(key)}
    buildAddActionFunc={customAction => ElementAssembleStoreType.AddCustomAction(customAction)}
    buildRemoveActionFunc={actionName => ElementAssembleStoreType.RemoveCustomAction(actionName)}
    buildDefaultOriginFileStrFunc=Method.buildDefaultActionOriginFileStr
    buildDefaultTranspiledFileStrFunc=Method.buildDefaultActionTranspiledFileStr
    setCurrentCustomNameToGlobalFunc=CodeEditUtils.setCurrentCustomActionNameToGlobal
    currentCustomName=currentCustomActionName
    customs=customActions
    prefix="Action"
  />
}
