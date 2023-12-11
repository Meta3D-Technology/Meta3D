open Antd
%%raw("import 'antd/dist/antd.css'")

let build = (account, repoLink, description) => {
  <Space direction=#vertical size=#middle>
    <Space direction=#horizontal size=#small>
      {repoLink === ""
        ? React.null
        : <Typography.Link href={repoLink} target=#_blank>
            {React.string(`Repo|`)}
          </Typography.Link>}
      <Typography.Text> {React.string({j`发布者：${account}`})} </Typography.Text>
    </Space>
    <Typography.Text> {React.string({j`${description}`})} </Typography.Text>
  </Space>
}

let buildWithoutRepoLink = (account, description) => {
  <Space direction=#vertical size=#middle>
    <Typography.Text> {React.string({j`发布者：${account}`})} </Typography.Text>
    <Typography.Text> {React.string({j`${description}`})} </Typography.Text>
  </Space>
}
