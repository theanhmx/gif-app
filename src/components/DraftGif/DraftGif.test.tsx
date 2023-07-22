import { fireEvent, render, screen } from '@testing-library/react';

import DraftGif from './DraftGif';

const mockGif = {
	file: new File([], 'test.gif'),
	tags: 'tag1, tag2, tag3',
	source_post_url: '',
};

describe('DraftGif', () => {
	window.URL.createObjectURL = jest.fn();

	afterEach(() => {
		(window.URL.createObjectURL as any).mockReset();
	});

	it('should render correctly', () => {
		const { container } = render(<DraftGif gif={mockGif} onChange={() => {}} onRemove={() => {}} />);
		expect(container).toMatchSnapshot();
	});

	it('should call onChange when tags are changed', () => {
		const mockOnChange = jest.fn();
		render(<DraftGif gif={mockGif} onChange={mockOnChange} onRemove={() => {}} />);

		const tagsInput = screen.getByTestId('tag-input') as HTMLInputElement;
		fireEvent.change(tagsInput, { target: { value: 'new tag' } });

		expect(mockOnChange).toHaveBeenCalledWith({
			...mockGif,
			tags: 'new tag',
		});
	});

	it('should call onChange when source input changed', () => {
		const mockOnChange = jest.fn();
		render(<DraftGif gif={mockGif} onChange={mockOnChange} onRemove={() => {}} />);

		const sourceInput = screen.getByTestId('source-input') as HTMLInputElement;
		fireEvent.change(sourceInput, { target: { value: 'new source' } });

		expect(mockOnChange).toHaveBeenCalledWith({
			...mockGif,
			source_post_url: 'new source',
		});
	});

	it('should call onRemove when remove button is clicked', () => {
		const mockOnRemove = jest.fn();
		render(<DraftGif gif={mockGif} onChange={() => {}} onRemove={mockOnRemove} />);
		const removeButton = screen.getByText('Remove');
		fireEvent.click(removeButton);
		expect(mockOnRemove).toHaveBeenCalled();
	});
});
