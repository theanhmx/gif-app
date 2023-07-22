import { render } from '@testing-library/react';
import Root from './Root';
import { SearchContextManager } from '@giphy/react-components';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const SearchContextWrapper = ({ children }: any) => {
	return <SearchContextManager apiKey="">{children}</SearchContextManager>;
};

const routes = [
	{
		path: '/',
		element: <Root />,
	},
];

const router = createMemoryRouter(routes, {
	initialEntries: ['/', '/detail/123'],
	initialIndex: 0,
});

const mockRequest = jest.fn();

jest.mock('@giphy/js-fetch-api', () => ({
	...jest.requireActual('@giphy/js-fetch-api'),
	request: () => {
		return function () {
			console.log('mockRequest');
			mockRequest();
		};
	},
}));

describe('Root', () => {
	it('should render correctly', () => {
		const { container } = render(<RouterProvider router={router} />, {
			wrapper: SearchContextWrapper,
		});
		expect(container).toMatchSnapshot();
	});

	// it('should get trending gifs when render', () => {
	// 	render(<RouterProvider router={router} />, {
	// 		wrapper: SearchContextWrapper,
	// 	});

	// 	expect(mockRequest).toHaveBeenCalledTimes(1);

	// 	expect(mockRequest).toHaveBeenCalledWith('https://api.giphy.com/v1/gifs/trending?api_key=&limit=30&rating=g');
	// });
});
