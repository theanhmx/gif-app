import React, { FC, SyntheticEvent, useContext } from 'react';
import { Grid, SearchBar, SearchContext } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';

import styles from './root.module.scss';
import { Link } from 'react-router-dom';

const Root: FC = () => {
	const { fetchGifs, searchKey } = useContext(SearchContext);

	const onGifClick = (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
		e.preventDefault();

		// open detail in a new window/tab
		window.open(`/detail/${gif.id}`);
	};

	return (
		<div className={styles.root}>
			<Link to="/upload" className={styles.upload}>
				Upload
			</Link>
			<SearchBar className={styles.searchBar} searchDebounce={500} placeholder="search for GIFs" />
			<Grid key={searchKey} columns={3} width={1280} fetchGifs={fetchGifs} onGifClick={onGifClick} />
		</div>
	);
};

export default Root;
