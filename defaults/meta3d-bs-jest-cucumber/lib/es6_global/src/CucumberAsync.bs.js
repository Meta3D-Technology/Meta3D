


var execStep = (function(stepFunc,title, bodyFunc){
stepFunc(title, () =>{
    return bodyFunc()
})
});

export {
  execStep ,
  
}
/* No side effect */
