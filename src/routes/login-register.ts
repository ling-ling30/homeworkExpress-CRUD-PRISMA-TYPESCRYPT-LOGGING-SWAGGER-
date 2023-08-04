/**
 * @swagger
 * components :
 *   tags: 
 *
 *     name: Register
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
 *       - Login
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
 *       - Register
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
import login from '../controllers/login';
import register from '../controllers/register';
const router = express.Router();

router.route('/login').post(login)
router.route('/register').post(register)
export default router;