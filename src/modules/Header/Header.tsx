import headerStyles from "@modules/Header/Header.module.scss";

import React, { MouseEvent } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSession, signIn, signOut } from "next-auth/react";

const TextControls = dynamic(() => import("@components/TextControls/TextControls"), {
	loading: () => <section />,
	ssr: false,
});

const Header = () => {
	const { data: session, status } = useSession();

	const loading = status === "loading";

	const handleSignin = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		signIn("github", { callbackUrl: "/protected" });
	};
	const handleSignout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		signOut();
	};

	return (
		<>
			<div className="flex flex-col bg-slate-500 text-slate-300 items-center text-xs">
				<div className={headerStyles.signedInStatus}>
					<p
						className={`nojs-show ${
							!session && loading ? headerStyles.loading : headerStyles.loaded
						}`}
					>
						{!session && (
							<>
								<span className={headerStyles.notSignedInText}>
									You are not signed in
								</span>
								<a
									href={`/api/auth/signin`}
									className={headerStyles.buttonPrimary}
									onClick={(e) => {
										handleSignin(e);
									}}
								>
									Sign in
								</a>
							</>
						)}
						{session?.user && (
							<>
								<span
									style={{ backgroundImage: `url(${session.user.image})` }}
									className={headerStyles.avatar}
								/>
								<span className={headerStyles.signedInText}>
									<small>Signed in as</small>
									<br />
									<strong>{session.user.email || session.user.name}</strong>
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
				<nav>
					<ul className={headerStyles.navItems}>
						<li className={headerStyles.navItem}>
							<Link href="/">
								<a>Home</a>
							</Link>
						</li>
						<li className={headerStyles.navItem}>
							<Link href="/protected">
								<a>Protected</a>
							</Link>
						</li>
					</ul>
				</nav>
			</div>

			<div className={headerStyles.header}>
				<span className={headerStyles.logo}>
					<Link href="/">typitype</Link>
				</span>
				<TextControls />
			</div>
		</>
	);
};

export default Header;
