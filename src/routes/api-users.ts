/**
 * @swagger
 * components :
 *   schemas:
 *      users:
 *        type: object
 *        required:
 *          -email
 *          -password
 *        properties:
 *          id:
 *            type: integer
 *            description: auto-generated integer
 *          email:
 *            type: string
 *            description: unique identifier
 *          gender:
 *            type: string
 *            description: the gender of the user
 *          password:
 *            type: string
 *            description: secret identifier
 *          role: 
 *            type: string
 *        example:
 *            id: 123
 *            email: test@test.com
 *            gender : female
 *            password: abcdefg
 *            role: admin
 *                    
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags : 
 *       - User-API
 *     summary: login to an existing account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object 
 *           example: {"email": "test@test.com", "password": "abcdefg"}
 *     responses:
 *      200: 
 *       description: success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: { "msg": "success",  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAxLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTExMzY1MTksImV4cCI6MTY5MTE0MDExOX0.5k8n7Np8LAzl7htyLzO3pwV-6EhQjzbJZuFcBQioFY0"}
 *            
 *             
 *      
 *      400 :
 *       description: bad request because of invalid data
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             example: {"message": "Email is not registered"}
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags : 
 *       - User-API
 *     summary: Register a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#components/schemas/users'
 *     responses:
 *      200: 
 *       description: success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             example: {msg:'user successfully registered'}
 *      
 *      400 :
 *       description: bad request because of invalid data
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             example: 
 *                  {"message": "Invalid email or password"}
 *                  
 */

import express from 'express'
import { deleteUser, getUsers, login, register, updateUser } from '../controllers/main_users';


const router = express.Router();

router.route('/login').post(login)
router.route('/register').post(register)



router.route('/')
/**
 * @swagger
 * /users:
 *   get:
 *     tags : 
 *       - User-API
 *     summary: retrieve user information
 *     parameters:
 *       - name : id
 *         in : query
 *       - name : email
 *         in : query
 *       - name : role
 *         in : query
 *       - name : gender
 *         in : query
 *       - name : page
 *         description : default = 1
 *         in : query
 *       - name : limit
 *         description : default = 10
 *         in : query
 *     responses:
 *      200: 
 *       description: show list of users
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#components/schemas/users' 
 *      
 *      400 :
 *       description: bad request because of invalid data
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: {"msg": "Data is invalid"}
 *                  
 */
.get(getUsers)
/**
 * @swagger
 * /users:
 *   put:
 *     tags : 
 *       - User-API
 *     summary: update user information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             example: {"role":admin}
 *     parameters:
 *       - name : id
 *         in : query
 *       - name : email
 *         in : query
 *       - name : role
 *         in : query
 *       - name : gender
 *         in : query
 *     responses:
 *      200: 
 *       description: Show updated users
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#components/schemas/users' 
 *           example: {msg: "Data is successfully updated"}
 *      
 *      400 :
 *       description: bad request because of invalid data
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: {"msg": "Data is invalid"}
 *                  
 */

.put(updateUser)

/**
 * @swagger
 * /users:
 *   delete:
 *     tags : 
 *       - User-API
 *     summary: delete users from database
 *     parameters:  
 *       - name : id
 *         in : query
 *       - name : email
 *         in : query
 *       - name : role
 *         in : query
 *       - name : gender
 *         in : query
 *     responses:
 *      200: 
 *       description: Show deleted user
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#components/schemas/users' 
 *           example: {msg: "user is deleted"}
 *      
 *      400 :
 *       description: bad request because of invalid data
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *           example: {"msg": "Data is invalid"}
 *     
 */        
.delete(deleteUser)
export default router;