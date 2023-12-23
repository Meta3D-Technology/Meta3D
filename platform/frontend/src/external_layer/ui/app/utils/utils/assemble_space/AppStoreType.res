type action = ..

type action +=
  | UserCenterAction(UserCenterStoreType.action)
  | EnterAppAction(EnterAppStoreType.action)
  | AssembleSpaceAction(AssembleSpaceStoreType.action)

type state = {
  userCenterState: UserCenterStoreType.state,
  enterAppState: EnterAppStoreType.state,
  assembleSpaceState: AssembleSpaceStoreType.state,
  eventEmitter: Event.eventEmitter,
}
