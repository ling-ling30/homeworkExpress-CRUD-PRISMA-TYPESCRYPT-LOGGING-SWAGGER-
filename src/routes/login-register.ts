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
 *     parameters:  
 *       
 *       - name : email
 *         in : body
 *         example: 
 *           "test@test.com"
 *       - name : password
 *         in : body
 *         example: 
 *           "ASDKsdVhIW"
 *     responses:
 *      200: 
 *       description: success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             
 *      
 *      400 :
 *       description: bad request because of invalid data
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags : 
 *       - Register
 *     summary: Register a new account
 *     parameters:  
 *       - name : email
 *         in : body
 *         example: 
 *           "test@test.com"
 *       - name : password
 *         in : body
 *         example: 
 *           "ASDKsdVhIW"
 *     responses:
 *      200: 
 *       description: success
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             
 *      
 *      400 :
 *       description: bad request because of invalid data
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 */

import express from 'express'
import login from '../controllers/login';
import register from '../controllers/register';
const router = express.Router();

router.route('/login').post(login)
router.route('/register').post(register)
export default router;