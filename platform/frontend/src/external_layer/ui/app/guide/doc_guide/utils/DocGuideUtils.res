module FirstEnterUserCenter = {
  let openDocDrawer = dispatch => {
    dispatch(
      AppStoreType.OpenDocDrawer({
        list{
          ({j`请阅读简介`}, {j`https://meta3d-website.4everland.app/docs/简介/`}),
          ({j`有问题请先阅读FAQ`}, {j`https://meta3d-website.4everland.app/docs/FAQ/`}),
        }
      }),
    )

    GuideUtils.markIsFinishFirstEnterUserCenter(true)
  }
}

module FirstAddUIControl = {
  let openDocDrawer = dispatch => {
    dispatch(
      AppStoreType.OpenDocDrawer({
        list{
          (
            {j`UI Control的文档`},
            {
              j`https://meta3d-website.4everland.app/docs/搭建编辑器-参考-UI%20Controls-概况/`
            },
          ),
        }
      }),
    )

    GuideUtils.markIsFinishFirstAddUIControl(true)
  }
}

module FirstRunCompleteEditorTemplate = {
  let openDocDrawer = dispatch => {
    dispatch(
      AppStoreType.OpenDocDrawer({
        list{
          (
            {j`“完整的编辑器”模板的文档`},
            {
              j`https://meta3d-website.4everland.app/docs/搭建编辑器-参考-编辑器模板-完整的编辑器/`
            },
          ),
        }
      }),
    )

    GuideUtils.markIsFinishFirstRunCompleteEditorTemplate(true)
  }
}

module FirstImportCompleteEditorTemplate = {
  let openDocDrawer = dispatch => {
    dispatch(
      AppStoreType.OpenDocDrawer({
        list{
          (
            {j`搭建编辑器-概况`},
            {j`https://meta3d-website.4everland.app/docs/搭建编辑器-概况/`},
          ),
          (
            {j`在模板的基础上加入Material Inspector面板的文档`},
            {
              j`https://meta3d-website.4everland.app/docs/搭建编辑器-示例-加入Material%20Inspector/`
            },
          ),
        }
      }),
    )

    GuideUtils.markIsFinishFirstImportCompleteEditorTemplate(true)
  }
}

module Input = {
  let openDocDrawer = dispatch => {
    dispatch(
      AppStoreType.OpenDocDrawer({
        list{
          (
            {j`写逻辑代码的文档`},
            {j`https://meta3d-website.4everland.app/docs/写代码-概况/`},
          ),
        }
      }),
    )

    GuideUtils.markIsFinishInput(true)
  }
}

module Action = {
  let openDocDrawer = dispatch => {
    dispatch(
      AppStoreType.OpenDocDrawer({
        list{
          (
            {j`写逻辑代码的文档`},
            {j`https://meta3d-website.4everland.app/docs/写代码-概况/`},
          ),
        }
      }),
    )

    GuideUtils.markIsFinishAction(true)
  }
}
