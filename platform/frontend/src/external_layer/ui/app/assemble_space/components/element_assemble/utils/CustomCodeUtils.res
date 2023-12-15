  let convertCodeToES6 = code => {
    code
    ->Js.String.slice(~from=0, ~to_=code->Js.String.length - 1, _)
    ->Js.String.replace({j`window.Contribute = {`}, "", _)
    ->Js.String.replace(
      {j`    getContribute: (api) => {`},
      {
        j`import { api } from "meta3d-type"

export let getContribute = (api:api) => {`
      },
      _,
    )
  }
