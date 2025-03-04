import * as express from 'express'
import cors from 'cors'
import { Request, Response } from 'express';
import { categories } from './categories';
import { tunes } from './tunes';
import { storage } from './storage';

const router = express.Router();

const corsOptions = {
	origin: ['http://localhost:3000', 'http://localhost:5173'],
}

router.use(express.json())
router.use(cors(corsOptions))
router.use('/categories', categories)
router.use('/tunes', tunes)
router.use('/storage', storage)

router.get('/', function(req:Request, res:Response) {
	res.send('Hello, please provide a collection name')
})


export default router