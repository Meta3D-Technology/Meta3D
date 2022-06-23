type labelAlign = [#left | #right]
type layout = [#horizontal | #vertical | #inline]
type size = [#small | #middle | #large]
type validatedMessages = {required: string}
type formEvent = ReactEvent.Form.t => unit
type rule = {
  required: bool,
  message: string,
}

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
  ~wrapperCol: 'e=?,
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
