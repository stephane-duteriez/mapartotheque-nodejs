import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import styles from './myAppBar.module.scss';

export default function MyAppBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="a"
						sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
						href="/"
					>
            Mapartotheque
					</Typography>
					<div className={styles.search}>
						<div className={styles.searchIconWrapper}>
							<SearchIcon />
						</div>
						<div className={styles.styledInputBase}>
							<InputBase
								placeholder="Search…"
								inputProps={{ 'aria-label': 'search' }}
							/>
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}