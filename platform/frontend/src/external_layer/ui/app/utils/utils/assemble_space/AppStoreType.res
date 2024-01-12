// type isTaskExec = bool

// type task = unit => isTaskExec

type text = string

type link = string

type docDrawerData = list<(text, link)>

type action = ..

type action +=
  | UserCenterAction(UserCenterStoreType.action)
  | AssembleSpaceAction(AssembleSpaceStoreType.action)
  | OpenDocDrawer(docDrawerData)
  | CloseDocDrawer
// | SetIdleTasks(list<task>)

type state = {
  userCenterState: UserCenterStoreType.state,
  assembleSpaceState: AssembleSpaceStoreType.state,
  eventEmitter: Event.eventEmitter,
  docDrawerData: option<docDrawerData>,
  // idleTasks: list<task>,
}
