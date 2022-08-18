import Router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import classNames from "classnames";

import { signIn, signOut, useSession } from "next-auth/react";

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

const Protected: NextPage = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	if (status === "unauthenticated") {
		Router.push("/");
		return null;
	}

	return (
		<>
			<h1>Protected Page</h1>
			<p>You can view this page because you are signed in.</p>
		</>
	);
};

export default Protected;
