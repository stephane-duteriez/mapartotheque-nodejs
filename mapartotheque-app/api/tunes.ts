import { addTuneToCategory, fetchAllByCollectionGroup, fetchById } from "@/firestore/db";
import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.get('/', function(req:Request, res:Response) {

	fetchAllByCollectionGroup('tunes').then((data) => {
		res.json(data)
	}).catch((error) => {
		res.send(`error, ${JSON.stringify(error)}`)
	});
});

router.get('/:id', function(req:Request, res:Response) {
	const id = req.params.id;
	  fetchById('categories', id).then((data) => {
		res.json(data)
	  }).catch((error) => {
		res.send(`error, ${JSON.stringify(error)}`)
	  });
});  

router.post("/", async function(req:Request, res:Response) {
	console.log(req.body)
	const tune = req.body;
	addTuneToCategory({tune}).then((data) => {
		res.json(data)
	}).catch((error) => {
		console.log(error)
		res.send(`error, ${JSON.stringify(error)}`)
	});
});

export { router as tunes }