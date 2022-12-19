let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <PackageSelectedPackages service />
}

let buildSelectedPackage = PackageTool.buildSelectedPackage

let useSelector = ({packageAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) =>
  PackageSelectedPackages.Method.useSelector(packageAssembleState)
