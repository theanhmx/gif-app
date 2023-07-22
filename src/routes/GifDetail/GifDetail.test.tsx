import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import GifDetail from './GifDetail';

jest.mock('@giphy/react-components', () => ({
	Gif: () => <div>Gif</div>,
}));

describe('GifDetail', () => {
	it('should render correctly', async () => {
		const fakeGif = {
			title: 'fake title',
			rating: 'fake rating',
			username: 'fake username',
			id: '123',
			url: 'https://abc.com/gifs/get/xyz.gif',
		};
		const routes = [
			{
				path: '/detail/:id',
				element: <GifDetail />,
				loader: () => fakeGif,
			},
		];

		const router = createMemoryRouter(routes, {
			initialEntries: ['/', '/detail/123'],
			initialIndex: 1,
		});

		render(<RouterProvider router={router} />);

		const title = await screen.findByTestId('title');
		const username = await screen.findByTestId('username');

		expect(title.textContent).toEqual('fake title - Rating: fake rating');
		expect(username.textContent).toEqual('By fake username');
	});
});
