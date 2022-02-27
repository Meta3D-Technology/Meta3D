export function serializeLib(fileStr: string, libraryName: string) {
  eval('(' + "(function(){" + fileStr + "}())" + ')')

  return (window as any)[libraryName]
}

export function getExtensionServiceFuncFromLib(lib: any) {
  return lib["getExtensionService"]
}

export function getCreateExtensionStateFuncFuncFromLib(lib: any) {
  return lib["createExtensionState"]
}

function _bindPromise<a, b>(p: Promise<a>, func: (val: a) => Promise<b>): Promise<b> {
  return p.then(func);
}

export function traverseReducePromiseM<a, b>(arr: Array<a>, func: (b: b, a: a) => Promise<b>, param: b): Promise<b> {
  if (arr.length === 0) {
    return Promise.resolve(param);
  } else {
    return _bindPromise(func(param, arr[0]), (function (h) {
      return traverseReducePromiseM(arr.slice(1), func, h);
    }));
  }
}
