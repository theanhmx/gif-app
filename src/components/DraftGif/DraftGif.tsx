import React, { ChangeEvent, FC } from 'react';

import { DraftGif } from '../../type/gif';
import Button from '../Button';

import styles from './draftGif.module.scss';

type DraftGifProps = {
	gif: DraftGif;
	onChange: (gif: DraftGif) => void;
	onRemove: () => void;
};

const DraftGifComponent: FC<DraftGifProps> = ({ gif, onChange, onRemove }) => {
	const { file, tags, source_post_url } = gif;

	const onTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange({
			...gif,
			tags: e.target.value,
		});
	};

	const onSourcePostUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange({
			...gif,
			source_post_url: e.target.value,
		});
	};

	const openDetail = () => {
		window.open(`/detail/${gif.id}`);
	};

	return (
		<div className={styles.draftGif}>
			<img src={URL.createObjectURL(file)} alt="gif" data-testid="gif-img" />
			<div className={styles.info}>
				{gif.id && <Button onClick={openDetail} text="Upload Success! View Now" />}
				<label htmlFor="tags" className={styles.label}>
					Tags:
				</label>
				<input
					type="text"
					name="tags"
					data-testid="tag-input"
					placeholder="pets, cat, meow"
					value={tags}
					onChange={onTagsChange}
				/>
				<label htmlFor="source_post_url" className={styles.label}>
					Source post url:
				</label>
				<input
					name="source_post_url"
					type="text"
					placeholder="http://www.mysite.com/my-post/"
					value={source_post_url}
					onChange={onSourcePostUrlChange}
					data-testid="source-input"
				/>
				<Button onClick={onRemove} text="Remove" className={styles.remove} />
			</div>
		</div>
	);
};

export default DraftGifComponent;
