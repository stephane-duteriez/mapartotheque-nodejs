import * as express from 'express'
import cors from 'cors'
import { NextFunction, Request, Response } from 'express';
import { categories } from './categories';
import { tunes } from './tunes';
import { storage } from './storage';
import { auth } from './auth';
import { auth as authAdmin } from 'firebase-admin';
const router = express.Router();

const corsOptions = {
	origin: ['http://localhost:3000', 'http://localhost:5173'],
}

router.use(express.json())
router.use(cors(corsOptions))
router.get('/', async function(req:Request, res:Response) {
	res.send('Hello, please provide a collection name')
})
router.use(function(req:Request, res:Response, next:NextFunction) {
	const accessToken = req.header("authorization");
	if (!accessToken) {
		res.status(401).send('Unauthorized');
		return;
	}
	authAdmin().verifyIdToken(accessToken).then(() => {
		next();
	}).catch(() => {
		res.status(401).send('Unauthorized');
	});
})
router.use('/auth', auth)
router.use('/categories', categories)
router.use('/tunes', tunes)
router.use('/storage', storage)


export default router