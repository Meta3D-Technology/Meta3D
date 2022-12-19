open Sinon

let buildUI = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedPackagesFromShop=list{},
  (),
) => {
  <PackagePackages service selectedPackagesFromShop />
}

let selectPackage = (~package, ~dispatch) => {
  PackagePackages.Method.selectPackage(dispatch, package)
}
