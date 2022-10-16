type action = {
  name: string,
  role: string,
}

type actions = array<action>

type getActions = unit => actions

/* ! skin protocol config */

type skinName = string

type getSkinName = unit => skinName
