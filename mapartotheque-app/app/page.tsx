
import { fetchAll } from "@/firestore/db";
import { Category, Tune } from "@/type";

const Home = async () => {
	const categories = await fetchAll<Category>("categories");
	const tunes = await fetchAll<Tune>("tunes");
	return (
		<div>
			<h1>Categories</h1>
			<div>
				{categories.map((category) => <div key={category.id}>{category.name}</div>)}
			</div>
			<h1>Tunes</h1>
			<div>
				{tunes.map((tune) => <div key={tune.id}>{tune.name} <img src={tune.imageUrl} /></div>)}
			</div>
		</div>
	);
}

export default Home;