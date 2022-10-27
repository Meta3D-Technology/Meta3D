type id = string

// type extension = {
//   id: id,
//   data: Meta3d.ExtensionFileType.extensionFileData,
// }
type extension = FrontendUtils.AssembleSpaceCommonType.extension

type selectedExtensions = list<FrontendUtils.AssembleSpaceCommonType.extensionData>

type contribute = FrontendUtils.AssembleSpaceCommonType.contribute

type selectedContributes = list<FrontendUtils.AssembleSpaceCommonType.contributeData>

// type selectedContributeProtocolConfigs = list<
//   option<FrontendUtils.CommonType.protocolConfig>,
// >

type account = string

type action =
  | SelectExtension(extension, option<FrontendUtils.CommonType.protocolConfig>)
  | NotSelectExtension(id)
  | SelectContribute(contribute, option<FrontendUtils.CommonType.protocolConfig>)
  | NotSelectContribute(id)
  | SetAccount(account)

type state = {
  account: option<string>,
  selectedExtensions: selectedExtensions,
  selectedContributes: selectedContributes,
}

let reducer = (state, action) => {
  switch action {
  | SelectExtension(data, protocolConfigOpt) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.push((
        data,
        protocolConfigOpt,
      )),
    }
  | NotSelectExtension(id) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.filter(((
        selectedExtension,
        _,
      )) => selectedExtension.id !== id),
    }
  | SelectContribute(data, protocolConfigOpt) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.push((
        data,
        protocolConfigOpt,
      )),
      // selectedContributeProtocolConfigs: state.selectedContributeProtocolConfigs->Meta3dCommonlib.ListSt.push(
      //   protocolConfigOpt,
      // ),
    }
  | NotSelectContribute(id) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.filter(((
        selectedContribute,
        _,
      )) => selectedContribute.id !== id),
    }
  | SetAccount(account) => {...state, account: Some(account)}
  }
}

let initialState = {
  account: None,
  selectedExtensions: list{},
  selectedContributes: list{},
  // selectedContributeProtocolConfigs: list{},
}
