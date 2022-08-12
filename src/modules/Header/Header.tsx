import React from "react";
import headerStyles from "@modules/Header/Header.module.scss";

import dynamic from "next/dynamic";

const TextControls = dynamic(() => import("@components/TextControls/TextControls"), {
	loading: () => <section />,
	ssr: false,
});

const Header = () => {
	return (
		<header className={headerStyles.header}>
			<nav className="font-bold text-2xl">typitype</nav>
			<TextControls />
		</header>
	);
};

export default Header;
