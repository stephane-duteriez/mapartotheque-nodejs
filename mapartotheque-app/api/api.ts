import * as express from 'express'
import cors from 'cors'
import { Request, Response } from 'express';
import { addTuneToCategory } from '@/firestore/db';
import { categories } from './categories';
import { tunes } from './tunes';

const router = express.Router();

const corsOptions = {
	origin: ['http://localhost:3000', 'http://localhost:5173'],
}

router.use(express.json())
router.use(cors(corsOptions))
router.use('/categories', categories)
router.use('/tunes', tunes)

router.get('/', function(req:Request, res:Response) {
	res.send('Hello, please provide a collection name')
})

router.post("/addTuneToCategory", async function(req:Request, res:Response) {
	console.log(req.body)
	const tune = req.body;
	addTuneToCategory({tune}).then((data) => {
		res.json(data)
	}).catch((error) => {
		console.log(error)
		res.send(`error, ${JSON.stringify(error)}`)
	});
});


export default router