open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectContribute = (dispatch, protocolIconBase64, protocolConfigStr, contribute) => {
    dispatch(
      FrontendUtils.ApAssembleStoreType.SelectContribute(
        protocolIconBase64,
        protocolConfigStr,
        contribute,
      ),
    )
  }

  let useSelector = ({selectedContributes}: FrontendUtils.ApAssembleStoreType.state) => {
    selectedContributes
  }
}

@react.component
let make = (~service: service, ~selectedContributesFromMarket: selectedContributesFromMarket) => {
  <ContributesUtils
    service
    selectedContributesFromMarket
    selectedContributeNames={FrontendUtils.ReduxUtils.ApAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({data}) => data.contributePackageData.name)}
    useDispatch=FrontendUtils.ReduxUtils.ApAssemble.useDispatch
    selectContribute=Method.selectContribute
  />
}
