import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';
import { DocumentData, getFirestore, WithFieldValue } from 'firebase-admin/firestore';


if (!getApps().length) {
	initializeApp({
		credential: applicationDefault()
	});
}

const db = getFirestore("mapartotheque");


export const fetchAll = async <T>(collectionName: string) : Promise<T[]> => {
	if (!collectionName) {
		throw new Error("Collection name is required");
	}
	const collection = await db.collection(collectionName).get();
	return collection.docs.map((doc) => ({id: doc.id, ...doc.data()})) as T[];
}

export const fetchById = async (collectionName: string, id: string) => {
	if (!collectionName) {
		throw new Error("Collection name is required");
	}
	if (!id) {
		throw new Error("Id is required");
	}
	const collection = await db.collection(collectionName).doc(id).get();
	return collection.data();
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