import { fetchAll, fetchById } from "@/firestore/db"
import { Tune } from "@/type/tune"
import Image from "next/image"


export async function generateStaticParams() {
	const tunes = await fetchAll<Tune>('tunes')
	return tunes.map((tune: Tune) => ({ slug: tune.id }))
}


const getTune = async (slug: string) => {
	const tune = await fetchById<Tune>("tunes", slug)
	return tune
}



const TunePage = async (props: {params: Promise<{slug: string}>}) => {
	const tune = await getTune((await props.params).slug)
	return <div>
		<h1>{tune?.name}</h1>
		<Image src={tune?.imageUrl ?? ""} alt={tune?.name ?? ""} width={1400} height={500} />
	</div>;
}

export default TunePage;