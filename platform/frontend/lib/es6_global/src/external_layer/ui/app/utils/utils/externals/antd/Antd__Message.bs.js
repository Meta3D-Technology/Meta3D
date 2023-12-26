


var getMessageAPI = (function (){
return globalThis.messageAPI
});

var setMessageAPI = (function (messageAPI){
globalThis.messageAPI = messageAPI
});

export {
  getMessageAPI ,
  setMessageAPI ,
}
/* No side effect */
