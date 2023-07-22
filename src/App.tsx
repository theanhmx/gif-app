import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GifDetail, Root, Upload } from './routes';

import { SearchContextManager } from '@giphy/react-components';
import { gf } from './api/giphyFetch';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
	},
	{
		path: '/detail/:id',
		element: <GifDetail />,
		loader: async ({ params }) => {
			const { data } = await gf.gif(params.id || '');
			return data;
		},
	},
	{
		path: '/upload',
		element: <Upload />,
	},
]);

function App() {
	return (
		<div className="App">
			<SearchContextManager apiKey="TA0egc9FO0OiKVDPqhOheLQM5ro36A5D">
				<RouterProvider router={router} />
			</SearchContextManager>
		</div>
	);
}

export default App;
