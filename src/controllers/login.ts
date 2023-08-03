import { PrismaClient } from "@prisma/client"
import { CustomAPIError } from "../errors/custom-error"
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const jwt_secret= String(process.env.JWT_SECRET) || "jwt-secret"

const login = async (req: any, res: any) => {
    const { email, password } = req.body
    //check if email and password are given
    if (!email || !password) {
        throw new CustomAPIError('Invalid username or password', 400)
    }
    //check if email and password are available in database
    const user = await prisma.users.findMany({ where: { email: email } })
    if (user.length === 0) {
        throw new CustomAPIError('Email is not registered', 400)
    }
    // console.log(user[0].password)
    if (!(user[0].password === password)){
        throw new CustomAPIError('Wrong password', 400)
    }
    //generate token
    const token = jwt.sign({id:user[0].id , email: user[0].email }, jwt_secret, { expiresIn: '1h' })
    //send token to client
    return res.status(200).json({ msg: `success`, token })
}


export default login