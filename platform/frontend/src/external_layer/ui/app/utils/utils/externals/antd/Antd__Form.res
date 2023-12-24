type labelAlign = [#left | #right]

type layout = [#horizontal | #vertical | #inline]

type size = [#small | #middle | #large]

type validatedMessages = {required: string}

type formEvent = ReactEvent.Form.t => unit

type ruleType = [#email]

type rule = {
  @as("type") _type: Js.Nullable.t<ruleType>,
  required: bool,
  message: string,
}

type fieldValue

type field = {
  key: string,
  name: string,
  value: fieldValue,
}

type fields = array<field>

type crudOperator = {
  add: (. unit) => unit,
  remove: (. string) => unit,
}

// TODO handle error(need ErrorList)
// type errorOperator = {
// errors
// }

@module("antd") @react.component
external make: (
  ~component: React.element=?,
  ~colon: bool=?,
  ~fields: array<'a>=?,
  ~form: {..}=?,
  ~initialValues: 'b=?,
  ~labelAlign: labelAlign=?,
  ~labelCol: 'c=?,
  ~layout: layout=?,
  ~preserve: bool=?,
  ~requiredMark: bool=?,
  ~scrollToFirstError: bool=?,
  ~size: size=?,
  ~validatedMessages: validatedMessages=?,
  ~validatedTrigger: 'd=?,
  ~name: string=?,
  ~wrapperCol: 'e=?,
  ~autoComplete: string=?,
  ~onFinish: formEvent=?,
  ~onFinishFailed: formEvent=?,
  ~onFieldsChange: formEvent=?,
  ~onValuesChange: formEvent=?,
  ~children: React.element=?,
) => React.element = "Form"

module Item = {
  @react.component @module("antd") @scope("Form")
  external make: (
    ~color: bool=?,
    ~dependencies: 'a=?,
    ~extra: React.element=?,
    ~getValueFromEvent: ReactEvent.Form.t=?,
    ~getValueFromProps: 'a=?,
    ~hasFeedback: bool=?,
    ~help: React.element=?,
    ~htmlFor: string=?,
    ~initialValue: string=?,
    ~noStyle: bool=?,
    ~label: 'b=?,
    ~labelAlign: labelAlign=?,
    ~labelCol: 'c=?,
    ~required: bool=?,
    ~children: React.element=?,
    ~wrapperCol: 'e=?,
    ~name: string=?,
    ~rules: array<rule>=?,
  ) => React.element = "Item"
}

module List = {
  @react.component @module("antd") @scope("Form")
  external make: (
    ~initialValue: array<fieldValue>=?,
    // ~children: (fields, crudOperator, errorOperator) => React.element=?,
    ~children: (fields, crudOperator) => React.element=?,
    ~name: string=?,
    ~rules: array<rule>=?,
  ) => React.element = "List"
}
