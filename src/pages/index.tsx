import { Dispatch, SetStateAction, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import classNames from "classnames";

import { getSession, signIn, signOut, useSession } from "next-auth/react";

import useStore from "@store/store";
import TextBox from "@components/TextBox/TextBox";
import Results from "@components/Results/Results";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import Link from "next/link";

export type PropsType = {
	showText?: boolean;
	isTextFullView?: boolean;
	setIsTextFullView: Dispatch<SetStateAction<boolean>>;
	setShowText: Dispatch<SetStateAction<boolean>>;
	nodeRef?: any;
};

const Home: NextPage = () => {
	const { gameStatus } = useStore();
	const [showText, setShowText] = useState(true);
	const [isTextFullView, setIsTextFullView] = useState(false);

	// const { data: status, session, clientId, clientString } = useSession();

	// const loading = status === "loading";

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="container__app">
				<div className="container__inner">
					<Header />

					<main>
						<div
							className={classNames("container__body", {
								"!cursor: none;": gameStatus === "ongoing",
							})}
						>
							{gameStatus === "finished" && (
								<Results
									setIsTextFullView={setIsTextFullView}
									setShowText={setShowText}
								/>
							)}
							<TextBox
								showText={showText}
								setShowText={setShowText}
								isTextFullView={isTextFullView}
								setIsTextFullView={setIsTextFullView}
							/>
						</div>
					</main>

					<Footer />
				</div>
			</div>
		</>
	);
};

export default Home;
