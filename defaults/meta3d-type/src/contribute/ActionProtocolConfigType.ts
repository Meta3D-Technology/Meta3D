export type action = {
  name: string,
  role: string,
}


export type actions = Array<action>

export type getActions = () => actions
