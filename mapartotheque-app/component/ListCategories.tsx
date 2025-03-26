import { fetchAll } from "@/firestore/db";
import { Category, Tune } from "@/type";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Stack,  Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LineTune } from "./LineTune";
import styles from "./ListCategories.module.scss";
export const ListCategories = async () => {
	const categories = await fetchAll<Category>("categories");
	const tunes = await fetchAll<Tune>("tunes");
	const acc: Record<string, Tune[]> = {};
	const tunesByCategory = tunes.reduce((acc, tune) => {
		acc[tune.category.id] = [...(acc[tune.category.id] || []), tune];
		return acc;
	}, acc);

	return <div>
		{categories.map((category) => (
			<div key={category.id} className={styles.categories}>
				{tunesByCategory[category.id]?.length > 0 && <Accordion key={category.id}>
					<AccordionSummary
						aria-controls="categories-accordion"
						expandIcon={<ExpandMoreIcon />}
						id="categories-accordion">
						<Typography>{category.name}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ width: '100%'}}>
							<Stack spacing={2}>
								{tunesByCategory[category.id]?.map((tune) => (
									<LineTune key={tune.id} tune={tune} />
								))}
							</Stack>
						</Box>
					</AccordionDetails>
				</Accordion>
				}
			</div>
		))}
	</div>
}