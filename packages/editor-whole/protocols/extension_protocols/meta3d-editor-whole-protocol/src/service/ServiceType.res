// type ui = {
//   registerElement: 'elementState. (
//     Meta3dType.Index.state,
//     Meta3dUiProtocol.ElementContributeType.elementContribute<'elementState>,
//   ) => Meta3dType.Index.state,
// }

type ui = Meta3dUiProtocol.ServiceType.service

type service = {ui: Meta3dType.Index.state => ui}
