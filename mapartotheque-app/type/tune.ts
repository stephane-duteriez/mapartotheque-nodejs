import { Category } from "./category";

export type Tune = {
	id: string;
	name: string;
	category: Category;
	youtubeLink: string;
	lilyTest: string;
	lilyChords: string;
	imageUrl: string;
	pdfUrl: string;
	author: string;
}