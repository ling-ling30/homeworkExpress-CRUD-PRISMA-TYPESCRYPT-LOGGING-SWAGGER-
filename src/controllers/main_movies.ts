import { PrismaClient } from '@prisma/client';
import { CustomAPIError } from '../errors/custom-error';
const prisma = new PrismaClient();

const createMovies = async(req:any, res:any) => {
    const data = req.body as any
    if(data.title && data.genres && data.year){
    const newMovies = await prisma.movies.create({data})
    res.status(201).json({msg:`Movies is created` ,newMovies})
}else {throw new CustomAPIError('the data is invalid, please provide title, genre and year',400)}
}
const getMovies = async ( req: any , res:any ) => {
    const {id, title, genres, year} = req.query
    const queryObject = {id, title, genres,year} as any
    // check if the data is presented
    if(id){
        queryObject.id = Number(id)
    }
    if(year){
        queryObject.year = Number(year)
    }
    if(title){
        queryObject.title = {contains : title, mode: 'insensitive'}
    }
    if(genres){
        queryObject.genres = {contains : genres, mode: 'insensitive'}
    }
    // console.log(queryObject)

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.skip) || 10
    const skip = (page-1) * limit
    const data = await prisma.movies.findMany({skip: skip, take: limit, where: queryObject})

    res.status(200).json({data, nbHits: data.length , page})
}

const updateMovies = async ( req: any , res: any ) => {
    const {id, title, genres,year} = req.query
    const queryObject = {id, title, genres} as any
    // check if the data is presented
    if(year){
        queryObject.year = Number(year)
    }
    if(id){
        queryObject.id = Number(id)
    }
    if(title){
        queryObject.title = {contains : title, mode: 'insensitive'}
    }
    if(genres){
        queryObject.genres = {contains : genres, mode: 'insensitive'}
    }
    const data = req.body as any

    //if data is present, then match it in the database and return the data

    if (data.title|| data.genres|| data.year || data.id){
   try {
     const updatedData = await prisma.movies.update({where: queryObject, data: data})   
     res.status(200).json({msg: `Data is successfully updated`, data: updatedData})
   } catch (error) {
    console.log(error)
    throw new CustomAPIError('no matching movies found',400)    
   }
} else {
    throw new CustomAPIError(`the data is invalid`, 400)
}
    // const data = await prisma.movies.update({where:})
}

const deleteMovies = async ( req: any , res: any ) => {
    const {id, title, genres, year} = req.query
    const queryObject = {id, title, genres} as any

    // check if the data is presented
    if(year){
        queryObject.year = Number(year)
    }
    if(id){
        queryObject.id = Number(id)
    }
    if(title){
        queryObject.title = {contains : title, mode: 'insensitive'}
    }
    if(genres){
        queryObject.genres = {contains : genres, mode: 'insensitive'}
    }
    
    //if data is present, then match it in the database and return the data
    if(queryObject.id || queryObject.title || queryObject.genres){
    try {
        const data = await prisma.movies.delete({where: queryObject})
        res.status(200).json({msg:`Movies is deleted` , data})
    } catch (error) {
        console.log(error)
        throw new CustomAPIError('no matching movies found',400)
    }}
    else {throw new CustomAPIError(`the data is invalid`, 400)}
}

export {getMovies, updateMovies, deleteMovies, createMovies}