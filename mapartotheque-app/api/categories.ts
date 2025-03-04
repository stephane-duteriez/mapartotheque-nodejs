import { deleteById, fetchAll, fetchById, postByCollection, updateById } from "@/firestore/db";
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', function(req:Request, res:Response) {
	  fetchAll('categories').then((data) => {
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

router.put('/:id', function(req:Request, res:Response) {
	const id = req.params.id;
	const category = req.body;
	updateById('categories', id, category).then((data) => {
		res.json(data)
	}).catch((error) => {
		res.send(`error, ${JSON.stringify(error)}`)
	});
});

router.delete('/:id', function(req:Request, res:Response) {
	const id = req.params.id;
	deleteById('categories', id).then((data) => {
		res.json(data)
	}).catch((error) => {
		res.send(`error, ${JSON.stringify(error)}`)
	});
});

export { router as categories }