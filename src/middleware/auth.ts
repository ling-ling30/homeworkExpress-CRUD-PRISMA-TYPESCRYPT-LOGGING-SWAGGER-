import jwt  from "jsonwebtoken";
import { CustomAPIError } from "../errors/custom-error";
const jwt_secret: string = String(process.env.JWT_SECRET) || "jwt-secret"
const auth = (req: any,res:any,next:any) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer')) {
        throw new CustomAPIError('UNAUTHORIZED! invalid Token.',401)
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token , jwt_secret)
        console.log(decoded);
        next()
    } catch (error) {
        throw new CustomAPIError('UNAUTHORIZED! something is wrong',401)
    }
}
export default auth