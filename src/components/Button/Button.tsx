import buttonStyles from "@components/Button/Button.module.scss";
import React from "react";

type PropsTypes = {
	children: React.ReactNode;
	color: "color-main" | "color-accent" | "color-theme";
	onClick?: React.MouseEventHandler;
	buttonInside?: boolean;
	disabled?: boolean;
	[x: string]: any;
};

const Button = React.forwardRef(
	({ onClick, children, color, ...rest }: PropsTypes, ref: React.Ref<HTMLButtonElement>) => {
		return (
			<button {...rest} ref={ref} onClick={onClick}>
				{children}
			</button>
		);
	}
);
Button.displayName = "Button";
export default Button;
