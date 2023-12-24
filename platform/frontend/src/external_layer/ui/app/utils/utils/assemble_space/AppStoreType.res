// type isTaskExec = bool

// type task = unit => isTaskExec

type action = ..

type action +=
  | UserCenterAction(UserCenterStoreType.action)
  | EnterAppAction(EnterAppStoreType.action)
  | AssembleSpaceAction(AssembleSpaceStoreType.action)
  // | SetIdleTasks(list<task>)

type state = {
  userCenterState: UserCenterStoreType.state,
  enterAppState: EnterAppStoreType.state,
  assembleSpaceState: AssembleSpaceStoreType.state,
  eventEmitter: Event.eventEmitter,
  // idleTasks: list<task>,
}
