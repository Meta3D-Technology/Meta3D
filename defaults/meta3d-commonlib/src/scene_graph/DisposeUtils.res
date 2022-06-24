let _isNotNeedDispose = (target, needDisposedIndexArray) =>
  !Js.Array.includes(target, needDisposedIndexArray)

let checkShouldNeedDisposed = (isDebug, targetName, targets, needDisposedTargetArray) => {
  Contract.requireCheck(() => {
    open Contract
    open Operators

    test(
      Log.buildAssertMessage(
        ~expect=j`${targetName} should need disposed`,
        ~actual=j`not`,
      ),
      () =>
        targets
        ->ArraySt.reduceOneParam(
          (. isNotNeedDispose, target) =>
            isNotNeedDispose ? true : _isNotNeedDispose(target, needDisposedTargetArray),
          false,
        )
        ->assertFalse,
    )
  }, isDebug)
}
