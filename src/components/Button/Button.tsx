import React, { FC } from 'react';
import cx from 'classnames';
import styles from './button.module.scss';

type ButtonProps = {
	text: string;
} & JSX.IntrinsicElements['button'];

const Button: FC<ButtonProps> = ({ text, onClick, className, ...restProps }) => {
	return (
		<button className={cx(styles.button, className)} onClick={onClick} {...restProps}>
			{text}
		</button>
	);
};

export default Button;
