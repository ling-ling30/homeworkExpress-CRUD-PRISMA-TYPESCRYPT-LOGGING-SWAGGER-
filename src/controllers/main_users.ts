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


const getUsers = async ( req: any , res:any ) => {
    const {id, email, gender, role} = req.query
    const queryObject = {id, email, gender, role} as any
    // check if the data is presented
    if(id){
        queryObject.id = Number(id)
    }
    if(email){
        queryObject.email = {contains : email, mode: 'insensitive'}
    }
    if(gender){
        queryObject.gender = {contains : gender, mode: 'insensitive'}
    }
    if(role){
        queryObject.role = {contains : role, mode: 'insensitive'}
    }
    // console.log(queryObject)

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.skip) || 10
    const skip = (page-1) * limit
    const data = await prisma.users.findMany({skip: skip, take: limit, where: queryObject})

    res.status(200).json({data, nbHits: data.length , page})
}

const register = async (req: any, res:any) => {
    const { email, password,role, gender } = req.body
    const bodyObject = {email, password, role, gender}
    //check if email and password are given
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email || !password) {
        throw new CustomAPIError('Invalid email or password', 400)
    }
    if(!expression.test(email)){
        throw new CustomAPIError('Please provide an Email', 400)
    }
    if(!role){
        throw new CustomAPIError('Please provide a role', 400)
    }
    if(!gender){
        throw new CustomAPIError('Please provide a gender', 400)
    }
    //check if email is registered
    const user = await prisma.users.findMany({ where: { email: email } })
    if (user.length > 0) {
        throw new CustomAPIError('Email is already registered', 400)
    }
    const newUser = await prisma.users.create({data: bodyObject})
    res.status(200).json({msg:'user successfully registered', newUser: newUser})
}

const updateUser= async (req: any, res:any) => {
    const {id, email, gender, role} = req.query
    const queryObject = {id, email, gender, role} as any
    // check if the data is presented
    if(id){
        queryObject.id = Number(id)
    }
    if(email){
        queryObject.email = {contains : email, mode: 'insensitive'}
    }
    if(gender){
        queryObject.gender = {contains : gender, mode: 'insensitive'}
    }
    if(role){
        queryObject.role = {contains : role, mode: 'insensitive'}
    }
    const data = req.body as any

    //if data is present, then match it in the database and return the data

    if (data.email|| data.gender|| data.role || data.id){
   try {
     const updatedData = await prisma.users.update({where: queryObject, data: data})   
     res.status(200).json({msg: `Data is successfully updated`, data: updatedData})
   } catch (error) {
    console.log(error)
    throw new CustomAPIError('no matching users found',400)    
   }
} else {
    throw new CustomAPIError(`the data is invalid`, 400)
}
}

const deleteUser = async ( req: any , res: any ) => {
    const {id, email, gender, role} = req.query
    const queryObject = {id, email, gender, role} as any
    // check if the data is presented
    if(id){
        queryObject.id = Number(id)
    }
    if(email){
        queryObject.email = {contains : email, mode: 'insensitive'}
    }
    if(gender){
        queryObject.gender = {contains : gender, mode: 'insensitive'}
    }
    if(role){
        queryObject.role = {contains : role, mode: 'insensitive'}
    }
    
    //if data is present, then match it in the database and return the data
    if(queryObject.id || queryObject.title || queryObject.genres){
    try {
        const data = await prisma.users.delete({where: queryObject})
        res.status(200).json({msg:`User is deleted` , data})
    } catch (error) {
        console.log(error)
        throw new CustomAPIError('no matching user is found',400)
    }}
    else {throw new CustomAPIError(`the data is invalid`, 400)}
}

export { login, register, getUsers, updateUser, deleteUser }