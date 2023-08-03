import { PrismaClient } from "@prisma/client"
import { CustomAPIError } from "../errors/custom-error"

const prisma = new PrismaClient()
const register = async (req: any, res:any) => {
    const { email, password } = req.body
    //check if email and password are given
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email || !password) {
        throw new CustomAPIError('Invalid username or password', 400)
    }
    if(!expression.test(email)){
        throw new CustomAPIError('Please provide an Email', 400)
    }
    //check if email is registered
    const user = await prisma.users.findMany({ where: { email: email } })
    if (user.length > 0) {
        throw new CustomAPIError('Email is already registered', 400)
    }
    const newUser = await prisma.users.create({data: { email: email, password: password}})
    res.status(200).json({msg:'user successfully registered', newUser: newUser})
}

export default register