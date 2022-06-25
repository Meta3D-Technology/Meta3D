@deriving(jsConverter)
type listType = [@as("picture-card") #pictureCard | #picture | #text]

@module("antd") @react.component
external make: (
  ~accept: string=?,
  ~_method: string=?,
  ~name: string=?,
  ~action: string=?,
  ~headers: 'a=?,
  ~directory: bool=?,
  ~onChange: ReactEvent.Form.t => unit=?,
  ~children: React.element=?,
  ~beforeUpload: ReactEvent.Form.t => unit=?,
  ~customRequest: unit => unit=?,
  ~data: 'b=?,
  ~defaultFileList: array<'c>=?,
  ~disabled: bool=?,
  ~fileList: array<'d>=?,
  ~listType: listType=?,
  ~multiple: bool=?,
  ~previewFile: Js.Promise.t<'e> => Js.Promise.t<'e>=?,
  ~onDownload: unit => unit=?,
  ~transformFile: 'f=?,
  ~progress: 'g=?,
  ~style: ReactDOM.Style.t=?,
) => React.element = "Upload"
