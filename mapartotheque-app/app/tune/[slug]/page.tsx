import { fetchById } from "@/firestore/db";
import { Tune } from "@/type";

export const TunePage = async ({ params }: { params: { slug: string } }) => {
	const tune = await fetchById<Tune>("tunes", params.slug);
	console.log(tune);
	return <div>
		<h1>{tune?.name}</h1>
		<img src={tune?.imageUrl} alt={tune?.name} />
	</div>;
}

export default TunePage;