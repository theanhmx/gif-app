import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import { DraftGif } from '../../type/gif';
import { uploadGif } from '../../api/giphyFetch';
import { DraftGif as DraftGifComponent, Button } from '../../components';

import styles from './upload.module.scss';
import { Loader } from '@giphy/react-components';

const IMAGE_MAX_SIZE = 5000000; // 5MB

const Upload: FC = () => {
	const [draftGifs, setDraftGifs] = useState<DraftGif[]>([]);
	const imageInputRef = useRef<HTMLInputElement>(null);
	const [responseCounter, setResponseCounter] = useState(0);
	const [loading, setLoading] = useState(false);

	const onChangeImage = () => {
		imageInputRef?.current?.click();
	};

	const onFileChangeCapture = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file?.size && file.size > IMAGE_MAX_SIZE) {
			alert('File is too big!');
			// Reset input
			e.target.value = '';
			return;
		}

		if (file !== undefined) {
			setDraftGifs((prev) => [
				...prev,
				{
					file,
					tags: '',
					source_post_url: '',
				},
			]);
		}
	};

	const submit = () => {
		setResponseCounter(0);
		setLoading(true);
		draftGifs
			.filter((gif) => !gif.id) // only upload gifs that have not been uploaded yet (no id)
			.forEach(async (gif) => {
				const response = await uploadGif(gif);
				const { data } = await response.json();
				if (data.id) {
					setDraftGifs((prev) =>
						prev.map((prevGif) => {
							if (prevGif.file === gif.file) {
								return {
									...prevGif,
									id: data.id,
								};
							}
							return prevGif;
						})
					);
				}
				setResponseCounter((prev) => prev + 1);
			});
	};

	useEffect(() => {
		const newGifs = draftGifs.filter((gif) => !gif.id);
		if (responseCounter === newGifs.length) {
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [responseCounter]);

	return (
		<div className={styles.upload}>
			<span className={styles.title}>Upload your GIFs</span>
			<div className={styles.gifs}>
				{draftGifs.map((gif, i) => (
					<DraftGifComponent
						key={i}
						gif={gif}
						onChange={(newGif) => {
							setDraftGifs((prev) =>
								prev.map((prevGif, index) => {
									if (index === i) {
										return newGif;
									}
									return prevGif;
								})
							);
						}}
						onRemove={() => {
							setDraftGifs((prev) => prev.filter((_, index) => index !== i));
						}}
					/>
				))}
			</div>
			<input
				type="file"
				accept="image/gif,video/mp4,video/mov,video/quicktime,video/webm"
				onChangeCapture={onFileChangeCapture}
				name="Add your GIF"
				ref={imageInputRef}
				className={styles.hiddenInput}
				data-testid="file-input"
			/>
			<Button
				text={draftGifs.length === 0 ? 'Choose your GIF' : 'Add more GIF'}
				onClick={onChangeImage}
				className={styles.fileInput}
			/>
			{loading && <Loader />}
			{draftGifs.length > 0 && !loading && (
				<Button
					className={styles.upload}
					onClick={submit}
					text="Submit"
					disabled={loading}
					data-testid="submit"
				/>
			)}
		</div>
	);
};

export default Upload;
