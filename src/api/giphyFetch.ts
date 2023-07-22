import { GiphyFetch } from '@giphy/js-fetch-api';
import { DraftGif } from '../type/gif';

const API_KEY = 'TA0egc9FO0OiKVDPqhOheLQM5ro36A5D';

// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
export const gf = new GiphyFetch(API_KEY);

export const uploadGif = (draftGif: DraftGif) => {
	const formData = new FormData();
	formData.append('api_key', API_KEY);
	formData.append('file', draftGif.file, draftGif.file.name);
	formData.append('tags', draftGif.tags);
	if (draftGif.source_post_url) {
		formData.append('source_post_url', draftGif.source_post_url);
	}
	return fetch('https://upload.giphy.com/v1/gifs/', {
		method: 'POST',
		body: formData,
	});
};
