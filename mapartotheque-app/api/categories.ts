import { fetchAllByCollection, fetchById, postByCollection } from "@/firestore/db";
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', function(req:Request, res:Response) {
	  fetchAllByCollection('categories').then((data) => {
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
	const category = req.body;
	postByCollection('categories', category).then((data) => {
	  res.json(data)
	}).catch((error) => {
	  console.log(error)
	  res.send(`error, ${JSON.stringify(error)}`)
	});
});

export { router as categories }