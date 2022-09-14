type skinName = string

type skinContribute<'buttonStyle> = {
  skinName: skinName,
  button: 'buttonStyle,
}

// type getSkinContribute<'buttonStyle> = unit => skinContribute<'buttonStyle>
