function form(method) {
  let res = null
  switch(method){
    case 'POST':
      res = {MESSAGE:'ok'}
      break;
    default:
      res = null
  }
  return res
}


module.exports = form;