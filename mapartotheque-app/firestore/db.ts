import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';
import { DocumentData, getFirestore, WithFieldValue } from 'firebase-admin/firestore';
import { Tune } from '../type';


if (!getApps().length) {
	initializeApp({
		credential: applicationDefault()
	});
}

const db = getFirestore("mapartotheque");


export const fetchAllByCollection = async <T>(collectionName: string) : Promise<T[]> => {
	if (!collectionName) {
		throw new Error("Collection name is required");
	}
	const collection = await db.collection(collectionName).get();
	return collection.docs.map((doc) => ({id: doc.id, ...doc.data()})) as T[];
}

export const fetchAllByCollectionGroup = async <T>(collectionName: string) : Promise<T[]> => {
	if (!collectionName) {
		throw new Error("Collection name is required");
	}
	const collection = await db.collectionGroup(collectionName).get();
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
	return res;
}

export const addTuneToCategory = async ({tune}: {tune: Tune}) => {
	console.log(tune)
	if (!tune.category.id) {
		throw new Error("Category id is required");
	}
	const category = db.collection("categories").doc(tune.category.id);
	const res = category.collection("tunes").add(tune);
	return res;
}