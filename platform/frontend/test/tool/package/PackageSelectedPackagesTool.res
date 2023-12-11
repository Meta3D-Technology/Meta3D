let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <PackageSelectedPackages service />
}

let buildSelectedPackage = PackageTool.buildSelectedPackage

let useSelector = ({packageAssembleState}: AssembleSpaceStoreType.state) =>
  PackageSelectedPackages.Method.useSelector(packageAssembleState)
