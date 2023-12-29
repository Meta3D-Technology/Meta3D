type slide = int

type dots = {
    className:string
}

@module("antd") @react.component
external make: (
  ~style: ReactDOM.Style.t=?,
  ~autoplay: bool=?,
  ~autoplaySpeed: int=?,
  ~dots: bool=?,
  ~afterChange: slide => unit=?,
  ~children: React.element=?,
) => React.element = "Carousel"
