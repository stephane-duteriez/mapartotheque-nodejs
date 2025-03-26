import { Paper, Link, Typography, ButtonGroup, Button } from "@mui/material";
import styles from "./LineTune.module.scss";
import { Tune } from "@/type";
import { Launch, PlayCircleFilledOutlined, SaveAlt } from "@mui/icons-material";

export const LineTune = ({ tune }: { tune: Tune }) => {
	return (
		<Paper key={tune.id} className={styles.item}>
			<Link href={`/tune/${tune.id}`}>{tune.name}</Link>
			<Typography>{tune.author}</Typography>
			<ButtonGroup>
				<Button>
					<Link href={`/tune/${tune.id}`}><Launch/></Link>
				</Button>
				{tune.pdfUrl && (
					<Button>
						<Link href={`${tune.pdfUrl}`} download={`${tune.name}.pdf`}><SaveAlt/></Link>
					</Button>
				)}
				{tune.youtubeLink && (
					<Button>
						<Link href={tune.youtubeLink}><PlayCircleFilledOutlined/></Link>
					</Button>
				)}
			</ButtonGroup>
		</Paper>
	)
}