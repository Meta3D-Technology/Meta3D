open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectContribute = (dispatch, protocolIconBase64, protocolConfigStr, contribute) => {
    dispatch(
      FrontendUtils.PackageAssembleStoreType.SelectContribute(
        protocolIconBase64,
        protocolConfigStr,
        contribute,
      ),
    )
  }

  let useSelector = ({selectedContributes}: FrontendUtils.PackageAssembleStoreType.state) => {
    selectedContributes
  }
}

@react.component
let make = (~service: service, ~selectedContributesFromMarket: selectedContributesFromMarket) => {
  <ContributesUtils
    service
    selectedContributesFromMarket
    selectedContributeNames={FrontendUtils.ReduxUtils.PackageAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({data}) => data.contributePackageData.name)}
    useDispatch=FrontendUtils.ReduxUtils.PackageAssemble.useDispatch
    selectContribute=Method.selectContribute
  />
}
