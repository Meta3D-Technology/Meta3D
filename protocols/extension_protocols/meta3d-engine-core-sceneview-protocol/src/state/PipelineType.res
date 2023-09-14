type link = [#merge | #concat]

type elementType = [#job | #group]

type elementName = string

type element = {
  name: elementName,
  type_: elementType,
  is_set_state: Js.Nullable.t<bool>,
}

type groupName = string

type group = {
  name: groupName,
  link: link,
  elements: array<element>,
}

type groups = array<group>

type pipelineName = string

type pipelineData = {
  name: pipelineName,
  groups: groups,
  first_group: groupName,
}
