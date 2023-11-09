@val @scope("window")
external requestAnimationFrame: (float => unit) => int = "requestAnimationFrame"

@val @scope("window")
external cancelAnimationFrame: int => unit = "cancelAnimationFrame"
