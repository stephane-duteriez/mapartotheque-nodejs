
import { fetchAllByCollection } from "@/firestore/db";
import { Category } from "@/type";

const Home = async () => {
	const categories = await fetchAllByCollection<Category>("categories");
	return (
		<div>
			<h1>Categories</h1>
			<ul>
				{categories.map((category) => <li key={category.id}>{category.name}</li>)}
			</ul>
		</div>
	);
}

export default Home;