let matchAll =  %raw(`
  function (str, regex){
    return [...str.matchAll(regex) ]
  }
  `)