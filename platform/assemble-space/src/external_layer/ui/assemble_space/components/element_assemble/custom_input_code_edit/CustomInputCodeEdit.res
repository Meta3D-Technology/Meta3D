open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _convertCode = code => {
    code->Js.String.replace(
      {j`export var getContribute = (api) => {`},
      {
        j`window.Contribute = {
    getContribute: (api) => {
`
      },
      _,
    ) ++ "}"
  }

  let _getInputName = inputFileStr => {
    (
      inputFileStr
      ->Js.String.match_(%re("/inputName\:.*\"(.+)\",/im"), _)
      ->Meta3dCommonlib.OptionSt.getExn
    )[1]->Meta3dCommonlib.OptionSt.getExn
  }

  let getNewCode = (dispatch, inputName, newCode) => {
    let newCode = newCode->_convertCode

    dispatch(
      FrontendUtils.ElementAssembleStoreType.UpdateCustomInputFileStr(
        inputName,
        newCode->_getInputName,
        newCode,
      ),
    )
  }

  let getCode = (inputName, customInputs) => {
    (
      customInputs
      ->Meta3dCommonlib.ListSt.find((
        {name, fileStr}: FrontendUtils.ElementAssembleStoreType.customInput,
      ) => {
        name == inputName
      })
      ->Meta3dCommonlib.OptionSt.getExn
    ).fileStr
  }

  let useSelector = ({elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) => {
    let {currentCustomInputName, customInputs} = elementAssembleState

    (currentCustomInputName, customInputs)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = FrontendUtils.ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (currentCustomInputName, customInputs) = service.react.useSelector(. Method.useSelector)

  {
    switch currentCustomInputName {
    | None => React.null
    | Some(currentCustomInputName) =>
      <CodeEdit
        service
        code={Method.getCode(currentCustomInputName, customInputs)}
        getNewCodeFunc={Method.getNewCode(dispatch, currentCustomInputName)}
      />
    }
  }
}
