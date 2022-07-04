open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = () => {
  <>
    <Layout>
      <Layout.Header>
        <Button
          onClick={_ => {
            ()
          }}>
          {React.string(`发布`)}
        </Button>
      </Layout.Header>
      <Layout.Content> {React.string(`装配空间`)} </Layout.Content>
    </Layout>
  </>
}
