type skinName = string

// TODO move to StateType?
type buttonStyle

// @genType
type skinContribute<'buttonStyle> = {
  skinName: skinName,
  button: 'buttonStyle,
}

// @genType
type getSkinContribute<'buttonStyle> = unit => skinContribute<'buttonStyle>
