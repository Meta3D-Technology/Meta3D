open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let buildDefaultActionFileStr = actionName => {
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

  let useSelector = ({elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {customActions} = elementAssembleState

    customActions
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let customActions = service.react.useSelector(. Method.useSelector)

  <CustomDomUtils
    service
    buildSelectActionFunc={key => ElementAssembleStoreType.SelectCustomAction(key)}
    buildAddActionFunc={customAction => ElementAssembleStoreType.AddCustomAction(customAction)}
    buildDefaultFileStrFunc=Method.buildDefaultActionFileStr
    setCurrentCustomNameToGlobalFunc=CodeEditUtils.setCurrentCustomActionNameToGlobal
    customs=customActions
    prefix="Action"
  />
}
