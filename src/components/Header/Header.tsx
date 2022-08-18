import headerStyles from "@components/Header/Header.module.scss";

import React, { MouseEvent, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

import TextControls from "@components/TextControls/TextControls";

// import dynamic from "next/dynamic";
// const TextControls = dynamic(() => import("@components/TextControls/TextControls"), {
// 	loading: () => <section />,
// 	ssr: false,
// });

const Header = () => {
	// preventing server and clinet classnames from differing. Also could wrap TextControls in dynamic()
	const [isComponentMounted, setIsComponentMounted] = useState(false);
	useEffect(() => setIsComponentMounted(true), []);

	return (
		<div className={headerStyles.header}>
			<LogIn />

			<span className={headerStyles.logo}>
				<Link href="/">typitype</Link>
			</span>

			{isComponentMounted && <TextControls />}
		</div>
	);
};

const LogIn = () => {
	const { data: session, status } = useSession();

	const loading = status === "loading";

	const handleSignin = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		signIn("github");
		// signIn("github", { callbackUrl: "/protected" });
	};
	const handleSignout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		signOut();
	};

	return (
		<div className={headerStyles.signedInStatus}>
			<p
				className={`nojs-show ${
					!session && loading ? headerStyles.loading : headerStyles.loaded
				}`}
			>
				{!session && (
					<a
						href={`/api/auth/signin`}
						className={headerStyles.buttonPrimary}
						onClick={(e) => {
							handleSignin(e);
						}}
					>
						Sign in
					</a>
				)}
				{session?.user && (
					<>
						<span
							style={{ backgroundImage: `url(${session.user.image})` }}
							className={headerStyles.avatar}
						/>
						<span className={headerStyles.signedInText}>
							<strong>{session.user.name || session.user.email}</strong>
						</span>
						<a
							href={`/api/auth/signout`}
							className={headerStyles.button}
							onClick={(e) => {
								handleSignout(e);
							}}
						>
							Sign out
						</a>
					</>
				)}
			</p>
		</div>
	);
};

export default Header;
