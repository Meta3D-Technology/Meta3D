open Antd
%%raw("import 'antd/dist/reset.css'")

@react.component
let make = (~onStartFunc, ~title, ~description) => {
  <Layout>
    <Space direction=#horizontal>
      <Space direction=#vertical>
        <Typography.Title level=3> {React.string({j`${title}`})} </Typography.Title>
        <Typography.Text> {React.string({j`${description}`})} </Typography.Text>
      </Space>
      <Button
        _type=#primary
        onClick={_ => {
          onStartFunc()
        }}>
        {React.string(`开始`)}
      </Button>
    </Space>
  </Layout>
}
