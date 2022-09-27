open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {

}

// TODO check login

@react.component
let make = (
  ~service: service,
  ~username,
  ~selectedExtensionsFromShop: selectedExtensionsFromShop,
  ~selectedContributesFromShop: selectedContributesFromShop,
) => {
  <> <ApView service username selectedExtensionsFromShop selectedContributesFromShop /> </>
}
