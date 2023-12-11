open Sinon

let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedPackagesFromMarket=list{},
  (),
) => {
  <PackagePackages service selectedPackagesFromMarket />
}

let selectPackage = (~package, ~dispatch) => {
  PackagePackages.Method.selectPackage(dispatch, package)
}
