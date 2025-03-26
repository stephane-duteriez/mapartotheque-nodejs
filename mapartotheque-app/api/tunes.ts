import { deleteById, fetchAll, fetchById, postByCollection, updateById } from "@/firestore/db";
import { auth } from "firebase-admin";
import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.get('/', async function(req:Request, res:Response) {
	const accessToken = req.header("authorization");
	if (!accessToken) {
		res.status(401).send('Unauthorized');
		return;
	}
	auth().verifyIdToken(accessToken).then(() => {
		fetchAll('tunes').then((data) => {
			res.json(data)
		}).catch((error: unknown) => {
			res.send(`error, ${JSON.stringify(error)}`)
		});
	}).catch((error: unknown) => {
		console.log(error);
	});
});

router.get('/:id', function(req:Request, res:Response) {
	const id = req.params.id;
	  fetchById('tunes', id).then((data) => {
		res.json(data)
	  }).catch((error) => {
		res.send(`error, ${JSON.stringify(error)}`)
	  });
});  

router.post("/", async function(req:Request, res:Response) {
	console.log(req.body)
	const tune = req.body;
	postByCollection('tunes', tune).then((data) => {
		res.json(data)
	}).catch((error) => {
		console.log(error)
		res.send(`error, ${JSON.stringify(error)}`)
	});
});

router.put('/:id', function(req:Request, res:Response) {
	const id = req.params.id;
	const tune = req.body;
	updateById('tunes', id, tune).then((data) => {
		res.json(data)
	}).catch((error) => {
		res.send(`error, ${JSON.stringify(error)}`)
	});
});

router.delete('/:id', function(req:Request, res:Response) {
	const id = req.params.id;
	deleteById('tunes', id).then((data) => {
		res.json(data)
	}).catch((error) => {
		res.send(`error, ${JSON.stringify(error)}`)
	});
});

export { router as tunes }