/* eslint-disable testing-library/no-wait-for-side-effects */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as GiphyFetch from '../../api/giphyFetch';

import Upload from './Upload';

describe('Upload', () => {
	window.URL.createObjectURL = jest.fn();

	afterEach(() => {
		(window.URL.createObjectURL as any).mockReset();
	});

	it('should render correctly', () => {
		const { container } = render(<Upload />);

		expect(container).toMatchSnapshot();
	});

	it('should render the selected gif and submit button', async () => {
		render(<Upload />);

		const input = screen.getByTestId('file-input');
		const file = new File(['(⌐□_□)'], 'chucknorris.gif', { type: 'image/gif' });
		await waitFor(() =>
			fireEvent.change(input, {
				target: { files: [file] },
			})
		);

		const gif = screen.getByTestId('gif-img');
		const submitButton = screen.getByTestId('submit');
		expect(gif).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});

	it('should remove the file when remove is clicked', async () => {
		render(<Upload />);

		const input = screen.getByTestId('file-input');
		const file = new File(['(⌐□_□)'], 'chucknorris.gif', { type: 'image/gif' });
		await waitFor(() =>
			fireEvent.change(input, {
				target: { files: [file] },
			})
		);

		const gif = screen.getByTestId('gif-img');
		const removeButton = screen.getByText('Remove');
		fireEvent.click(removeButton);
		expect(gif).not.toBeInTheDocument();
	});

	it('should upload the gif with correct info', async () => {
		const mockUploadGif = jest.spyOn(GiphyFetch, 'uploadGif');
		render(<Upload />);

		const input = screen.getByTestId('file-input');
		const file = new File(['(⌐□_□)'], 'chucknorris.gif', { type: 'image/gif' });
		await waitFor(() =>
			fireEvent.change(input, {
				target: { files: [file] },
			})
		);

		const tagsInput = screen.getByTestId('tag-input') as HTMLInputElement;
		fireEvent.change(tagsInput, { target: { value: 'new tag' } });

		const sourceInput = screen.getByTestId('source-input') as HTMLInputElement;
		fireEvent.change(sourceInput, { target: { value: 'new source' } });

		const submitButton = screen.getByTestId('submit');
		fireEvent.click(submitButton);

		expect(mockUploadGif).toHaveBeenCalledWith({
			file,
			source_post_url: 'new source',
			tags: 'new tag',
		});
	});
});
