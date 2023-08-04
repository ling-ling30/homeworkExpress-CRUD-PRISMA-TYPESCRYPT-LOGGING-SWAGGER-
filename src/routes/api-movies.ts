/**
 * @swagger
 * components:
 *   tags: 
 *      name: Movie-API
 *      description: Managing movies Database CRUD functionality
 *   schemas : 
 *      movies:
 *        type: object
 *        required:
 *          -title
 *          -genres
 *          -year
 *        properties:
 *          id:
 *            type: integer
 *            description: auto-generated integer
 *          title:
 *            type: string
 *            description: unique identifier
 *          genres:
 *            type: string
 *            description: the genres of the movie
 *          year:
 *            type: integer
 *            description: the year of release
 *        example:
 *            id: 123
 *            title: Herculean
 *            genres : Action|Fantasy
 *            year: 2020
 */








import express from 'express'; 
import authenticationMiddleware from '../middleware/auth'
import {getMovies, updateMovies, deleteMovies, createMovies} from '../controllers/main_movies';

const router = express.Router();

router.route('/')
     /**
 * @swagger
 * /api/movies/:
 *   get:
 *     tags : [Movie-API]
 *     summary: only work if passed authorization process and will return a list of movies limit set to 10
 *     parameters:  
 *       - in: header
 *         name: Authorization
 *         description: Access Token
 *         type: string
 *         required: true
 *         example:
 *              Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAyLCJlbWFpbCI6ImZldWVyd2VyZmVyMEB0ZXN0LmNvbSIsImlhdCI6MTY5MDk2MTExNywiZXhwIjoxNjkwOTY0NzE3fQ.0VF-PfFYrKl4BgveXovnz3Xe9l9CUzwtFLeotMjTKPA
 *       - name : id
 *         in : query
 *       - name : title
 *         in : query
 *       - name : genres
 *         in : query
 *       - name : year
 *         in : query
 *       - name : page
 *         description : default = 1
 *         in : query
 *       - name : limit
 *         description : default = 10
 *         in : query
 *     security:
 *         - bearerAuth: []
 *     responses:
 *      200: 
 *       description: the list of movies
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             items: 
 *               $ref: '#/components/schemas/movies'
 *      400 :
 *       description: bad request because of invalid data
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: {"msg": "Data is invalid"}

 *      401 :
 *       description: Unauthorized
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: {"message": "UNAUTHORIZED! something is wrong"}
 */

   .get(authenticationMiddleware, getMovies)
   
   
/**
 * @swagger
 * /api/movies/}:
 *   put:
 *     tags : 
 *       - Movie-API
 *     security:
 *         - bearerAuth: []
 *     summary: only work if passed authorization process and update according to first movie according to query and change the value given in the body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             example: {"year":2022}
 *     parameters:  
 *       - in: header
 *         name: Authorization
 *         description: Access Token
 *         type: string
 *         required: true
 *         example:
 *              Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAyLCJlbWFpbCI6ImZldWVyd2VyZmVyMEB0ZXN0LmNvbSIsImlhdCI6MTY5MDk2MTExNywiZXhwIjoxNjkwOTY0NzE3fQ.0VF-PfFYrKl4BgveXovnz3Xe9l9CUzwtFLeotMjTKPA
 *       - name : id
 *         in : query
 *       - name : title
 *         in : query
 *       - name : genres
 *         in : query
 *       - name : year
 *         in : query

 *     responses:
 *      200: 
 *       description: Show updated movies
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             items: 
 *               $ref: '#/components/schemas/movies'
 *           example: {msg: "Data is successfully updated"}
 *      400 :
 *       description: bad request because of invalid data
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: {"msg": "Data is invalid"}

 *      401 :
 *       description: Unauthorized
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: {"message": "UNAUTHORIZED! something is wrong"}
 */
    .put(authenticationMiddleware, updateMovies)
    /**
 * @swagger
 * /api/movies:
 *   post:
 *     tags : 
 *       - Movie-API
 *     security:
 *         - bearerAuth: []
 *     summary: only work if passed authorization process and update the first movie according to query and change the value given in the body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#components/schemas/movies'
 *       
 *     parameters:  
 *       - in: header
 *         name: Authorization
 *         description: Access Token
 *         type: string
 *         required: true
 *         example:
 *              Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAyLCJlbWFpbCI6ImZldWVyd2VyZmVyMEB0ZXN0LmNvbSIsImlhdCI6MTY5MDk2MTExNywiZXhwIjoxNjkwOTY0NzE3fQ.0VF-PfFYrKl4BgveXovnz3Xe9l9CUzwtFLeotMjTKPA
 *       - name : id
 *         in : query
 *       - name : title
 *         in : query
 *       - name : year
 *         in : query

 *     responses:
 *      200: 
 *       description: Display created movie
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             items: 
 *               $ref: '#/components/schemas/movies'
 *             example: {msg:'Movies is created' , data}
 *      400 :
 *       description: bad request because of invalid data
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: {'the data is invalid, please provide title, genre and year'}

 *      401 :
 *       description: Unauthorized
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: {"message": "UNAUTHORIZED! something is wrong"}

 */

    .post(authenticationMiddleware,createMovies)
    /**
 * @swagger
 * /api/movies/:
 *   delete:
 *     tags : 
 *       - Movie-API
 *     security:
 *         - bearerAuth: []
 *     summary: only work if passed authorization process and delete the first movie according to query.
 *     parameters:  
 *       - in: header
 *         name: Authorization
 *         description: Access Token
 *         type: string
 *         required: true
 *         example:
 *              Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAyLCJlbWFpbCI6ImZldWVyd2VyZmVyMEB0ZXN0LmNvbSIsImlhdCI6MTY5MDk2MTExNywiZXhwIjoxNjkwOTY0NzE3fQ.0VF-PfFYrKl4BgveXovnz3Xe9l9CUzwtFLeotMjTKPA
 *       - name : id
 *         in : query
 *       - name : title
 *         in : query
 *       - name : genres
 *         in : query
 *       - name : year
 *         in : query

 *     responses:
 *      200: 
 *       description: Show deleted movies
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             items: 
 *               $ref: '#/components/schemas/movies'
 *           example: {msg: "user is deleted"}
 *      400 :
 *       description: bad request because of invalid data
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: {"msg": "Data is invalid"}

 *      401 :
 *       description: Unauthorized
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: {"message": "UNAUTHORIZED! something is wrong"}

 */
    .delete(authenticationMiddleware, deleteMovies)
export default router