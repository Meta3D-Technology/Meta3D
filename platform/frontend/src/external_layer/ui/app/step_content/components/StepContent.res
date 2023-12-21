open Antd
%%raw("import 'antd/dist/reset.css'")

@react.component
let make = (
  ~onStartFunc,
  ~title,
  ~description,
  ~beginGuideTarget: React.ref<Js.Nullable.t<'a>>,
) => {
  <Layout>
    <section ref={beginGuideTarget->Obj.magic}>
      <Space direction=#horizontal>
        <Space direction=#vertical>
          <Typography.Title level=3> {React.string({j`${title}`})} </Typography.Title>
          <Typography.Text> {React.string({j`${description}`})} </Typography.Text>
        </Space>
        <Badge dot=true>
          <Button
            _type=#primary
            onClick={_ => {
              onStartFunc()
            }}>
            {React.string(`开始引导`)}
          </Button>
        </Badge>
      </Space>
    </section>
  </Layout>
}
