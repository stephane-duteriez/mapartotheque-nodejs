import { initializeApp, applicationDefault, getApps, getApp } from 'firebase-admin/app';
import { DocumentData, getFirestore, WithFieldValue } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';


const app = getApps().length ? getApp() : initializeApp({
	credential: applicationDefault()
});

const auth = getAuth(app);

const db = getFirestore("mapartotheque");


export const fetchAll = async <T>(collectionName: string) : Promise<T[]> => {
	if (!collectionName) {
		throw new Error("Collection name is required");
	}
	const collection = await db.collection(collectionName).get();
	return collection.docs.map((doc) => ({id: doc.id, ...doc.data()})) as T[];
}

export const fetchById = async <T>(collectionName: string, id: string) : Promise<T | undefined> => {
	if (!collectionName) {
		throw new Error("Collection name is required");
	}
	if (!id) {
		throw new Error("Id is required");
	}
	const collection = await db.collection(collectionName).doc(id).get();
	return collection.data() as T;
}

export const postByCollection = async (collectionName: string, data: unknown) => {
	if (!collectionName) {
		throw new Error("Collection name is required");
	}
	const collection = db.collection(collectionName);
	const res = await collection.add(data as WithFieldValue<DocumentData>);
	const doc = await res.get();
	return {id: doc.id, ...doc.data()};
}

export const updateById = async (collectionName: string, id: string, data: unknown) => {
	if (!collectionName) {
		throw new Error("Collection name is required");
	}
	if (!id) {
		throw new Error("Id is required");
	}
	const document = db.collection(collectionName).doc(id);
	const res = await document.update(data as WithFieldValue<DocumentData>);
	return res;
}

export const deleteById = async (collectionName: string, id: string) => {
	if (!collectionName) {
		throw new Error("Collection name is required");
	}
	if (!id) {
		throw new Error("Id is required");
	}
	const document = db.collection(collectionName).doc(id);
	await document.delete();
}

export const createUser = async (email: string, password: string) => {
	if (!email || !password) {
		throw new Error("Email and password are required");
	}
	if (email !== "stephane@mapartotheque.com") {
		throw new Error("User creation is not allowed for this email");
	}
	try {
		const user = await auth.getUserByEmail(email);
		if (user) {
			throw new Error("User already exists");
		}
	} catch (error: unknown) {
		console.log(error);
	}
	try {
		await auth.createUser({
			email: email,
			password: password
		});
	} catch (error: unknown) {
		throw new Error(`User creation failed: ${JSON.stringify(error)}`);
	}
}