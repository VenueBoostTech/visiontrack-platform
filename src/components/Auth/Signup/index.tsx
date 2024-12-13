"use client";
import { useState } from "react";
import Link from "next/link";
import SigninWithMagicLink from "../SigninWithMagicLink";
import SignupWithPassword from "../SignupWithPassword";

export default function Signup() {
	const [signinOption, setSigninOption] = useState("magic-link");

	return (
		<>
			<div className='mx-auto w-full max-w-[400px] px-4 py-4'>
				<h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
					Create your account
				</h1>

				<div className='mb-4.5 flex w-full items-center justify-between gap-1.5 rounded-10 border border-stroke p-1 dark:border-stroke-dark'>
					<button
						onClick={() => setSigninOption("magic-link")}
						className={`h-[38px] w-full rounded-lg font-satoshi text-base font-medium tracking-[-.2px] ${
							signinOption === "magic-link"
								? "bg-primary/[.08] text-primary"
								: "text-dark dark:text-white"
						}`}
					>
						Magic Link
					</button>
					<button
						onClick={() => setSigninOption("password")}
						className={`h-[38px] w-full rounded-lg font-satoshi text-base font-medium tracking-[-.2px] ${
							signinOption === "password"
								? "bg-primary/[.08] text-primary"
								: "text-dark dark:text-white"
						}`}
					>
						Email
					</button>
				</div>

				<div>
					{signinOption === "magic-link" ? (
						<SigninWithMagicLink />
					) : (
						<SignupWithPassword />
					)}
				</div>

				<p className='text-center font-satoshi text-base font-medium text-dark dark:text-white'>
					Already have an account?{" "}
					<Link href='/auth/signin' className='ml-1 inline-block text-primary'>
						Sign In →
					</Link>
				</p>
			</div>
		</>
	);
}