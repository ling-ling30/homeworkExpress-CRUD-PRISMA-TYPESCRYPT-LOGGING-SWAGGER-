const requireJsonContent = async(req:any, res:any, next:any)=> {
  if(req.headers['Content-Type']!=='application/json'){
    return res.status(400).json({message: 'Content-Type must be application/json'});
  }else next()
}
export default requireJsonContent