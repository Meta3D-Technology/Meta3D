type layoutToken = {
  headerBg: string,
  headerPadding: string,
}

type buttonToken = {textHoverBg: string}

type components = {"Layout": layoutToken, "Button": buttonToken}

type theme = {components: components}

@module("antd") @react.component
external make: (~theme: theme=?, ~children: React.element=?) => React.element = "ConfigProvider"
