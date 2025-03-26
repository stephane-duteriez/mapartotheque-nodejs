import { createUser } from '../firestore/db';
import { Router } from 'express';

const router = Router();

router.post('/createUser', (req, res) => {
	const user = req.body;
	createUser(user.email, user.password).then((data) => {
		res.json(data)
	}).catch((error: unknown) => {
		res.send(`error, ${JSON.stringify(error)}`)
	});
})

export { router as auth }