export function serialize(fileStr: string, libraryName: string, funcName: string) {
  eval('(' + "(function(){" + fileStr + "}())" + ')')

  return (window as any)[libraryName][funcName]
}