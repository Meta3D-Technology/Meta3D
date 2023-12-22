let addType = code => {
  code->Js.String.replaceByRe(
    %re(j`/api\.getPackageService\(meta3dState,\s"meta3d-editor-whole-protocol"\)/g`),
    {j`api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")`},
    _,
  )
}

let convertCodeToES6 = code => {
  ({
    j`import { api } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
`
  } ++
  code
  ->Js.String.slice(~from=0, ~to_=code->Js.String.length - 1, _)
  ->Js.String.replace({j`window.Contribute = {`}, "", _)
  ->Js.String.replace(
    {j`getContribute: (api) => {`},
    {
      j`export let getContribute = (api:api) => {`
    },
    _,
  ))->addType
}
