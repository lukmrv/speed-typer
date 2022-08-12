import { cloneElement, useMemo, useState } from "react";
import {
	Placement,
	offset,
	flip,
	shift,
	autoUpdate,
	useFloating,
	useInteractions,
	useHover,
	useFocus,
	useRole,
	useDismiss,
} from "@floating-ui/react-dom-interactions";

interface Props {
	label: string;
	placement?: Placement;
	children: JSX.Element;
}

function mergeRefs<T = any>(
	refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
	return (value) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") {
				ref(value);
			} else if (ref != null) {
				(ref as React.MutableRefObject<T | null>).current = value;
			}
		});
	};
}

export const Tooltip = ({ children, label, placement = "top" }: Props) => {
	const [open, setOpen] = useState(false);

	const { x, y, reference, floating, strategy, context } = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		middleware: [offset(5), flip(), shift({ padding: 8 })],
		whileElementsMounted: autoUpdate,
	});

	const { getReferenceProps, getFloatingProps } = useInteractions([
		useHover(context),
		useFocus(context),
		useRole(context, { role: "tooltip" }),
		useDismiss(context),
	]);

	// Preserve the consumer's ref
	const ref = useMemo(() => mergeRefs([reference, (children as any).ref]), [reference, children]);

	return (
		<>
			{cloneElement(children, getReferenceProps({ ref, ...children.props }))}
			{open && (
				<div
					{...getFloatingProps({
						ref: floating,
						className: "Tooltip",
						style: {
							position: strategy,
							top: y ?? 0,
							left: x ?? 0,
						},
					})}
				>
					{label}
				</div>
			)}
		</>
	);
};
