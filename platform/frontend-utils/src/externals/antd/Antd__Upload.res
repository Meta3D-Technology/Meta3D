@deriving(jsConverter)
type listType = [@as("picture-card") #pictureCard | #picture | #text]

type file

type beforeUploadResult

@module("antd") @react.component
external make: (
  ~accept: string=?,
  ~_method: string=?,
  ~name: string=?,
  ~action: file => Js.Promise.t<string>=?,
  ~headers: 'a=?,
  ~directory: bool=?,
  ~showUploadList: bool=?,
  ~onChange: ReactEvent.Form.t => unit=?,
  ~children: React.element=?,
  ~beforeUpload: file => beforeUploadResult=?,
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
