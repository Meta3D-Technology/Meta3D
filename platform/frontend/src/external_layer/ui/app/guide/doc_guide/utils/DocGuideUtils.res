module ShowInput = {
  let openDocDrawer = dispatch => {
    dispatch(
      AssembleSpaceStoreType.OpenDocDrawer({
        list{({j`Input的文档`}, {j`TODO link`})}
      }),
    )

    GuideUtils.markFinishShowInput()
  }
}

module ShowAction = {
  let openDocDrawer = dispatch => {
    dispatch(
      AssembleSpaceStoreType.OpenDocDrawer({
        list{({j`Action的文档`}, {j`TODO link`})}
      }),
    )

    GuideUtils.markFinishShowAction()
  }
}
