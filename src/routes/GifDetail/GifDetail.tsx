import React, { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import { IGif } from '@giphy/js-types';
import { Gif } from '@giphy/react-components';

import styles from './gifDetail.module.scss';

const GifDetail: FC = () => {
	const data = useLoaderData() as IGif;

	return (
		<div className={styles.gifDetail}>
			<span className={styles.title} data-testid="title">
				{data.title || 'Untitled'} - Rating: {data.rating || 'unknown'}
			</span>
			<Gif gif={data} width={500} />
			{
				<span className={styles.title} data-testid="username">
					By {data.username || 'unknown'}
				</span>
			}
		</div>
	);
};

export default GifDetail;
