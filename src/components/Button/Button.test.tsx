import { render } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
	it('should render correctly', () => {
		const { container } = render(<Button text="test" />);
		expect(container).toMatchSnapshot();
	});
});
