import React, { Suspense } from "react";
import InvitedSignin from "@/components/Auth/InvitedSignin";

const InvitedSigninPage = () => {
	return (
		<main className='pt-[150px]'>
			<Suspense fallback={<div>Loading...</div>}>
				<InvitedSignin />
			</Suspense>
		</main>
	);
};

export default InvitedSigninPage;