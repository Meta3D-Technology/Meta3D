open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let selectContribute = (dispatch, protocolIconBase64, protocolConfigStr, contribute) => {
    dispatch(
      PackageAssembleStoreType.SelectContribute(
        protocolIconBase64,
        protocolConfigStr,
        contribute,
      ),
    )
  }

  let useSelector = ({selectedContributes}: PackageAssembleStoreType.state) => {
    selectedContributes
  }
}

@react.component
let make = (~service: service, ~selectedContributesFromMarket: selectedContributesFromMarket) => {
  <ContributesUtils
    service
    selectedContributesFromMarket
    selectedContributeNames={ReduxUtils.PackageAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({data}) => data.contributePackageData.name)}
    useDispatch=ReduxUtils.PackageAssemble.useDispatch
    selectContribute=Method.selectContribute
  />
}
