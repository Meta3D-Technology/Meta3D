open Antd
%%raw("import 'antd/dist/reset.css'")

module Method = {}

@react.component
let make = (~text="") => {
  <Row align=#middle>
    <img src="/static/image/png/logo.png" width="64px" height="64px" />
    <img src="/static/image/gif/loading.gif" width="100px" height="100ps" />
    {React.string(text)}
  </Row>
}
