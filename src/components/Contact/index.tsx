"use client";
import React, { useState } from "react";
import Breadcrumbs from "../Common/Breadcrumbs";
import Image from "next/image";
import { Check, AlertCircle } from 'lucide-react';

const Contact = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		message: ""
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [error, setError] = useState("");

	// @ts-ignore
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	// @ts-ignore
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		// Basic validation
		if (!formData.fullName || !formData.email || !formData.message) {
			setError("Please fill in all fields");
			setIsSubmitting(false);
			setShowNotification(true);
			setTimeout(() => setShowNotification(false), 3000);
			return;
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			setError("Please enter a valid email address");
			setIsSubmitting(false);
			setShowNotification(true);
			setTimeout(() => setShowNotification(false), 3000);
			return;
		}

		// Simulate API call
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			setShowNotification(true);
			setFormData({ fullName: "", email: "", message: "" });
			setTimeout(() => setShowNotification(false), 3000);
		} catch (err) {
			setError("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className='lg:ub-pb-22.5 overflow-hidden pb-17.5 pt-35 xl:pb-27.5 relative'>
			{/* Notification - Adjusted positioning */}
			{showNotification && (
				<div className={`fixed top-24 right-4 p-4 rounded-lg shadow-lg transition-all transform ${
					error ? 'bg-red-100' : 'bg-green-100'
				} z-40 animate-fade-in-down`}>
					<div className="flex items-center space-x-2">
						{error ? (
							<AlertCircle className="w-5 h-5 text-red-500" />
						) : (
							<Check className="w-5 h-5 text-green-500" />
						)}
						<p className={error ? 'text-red-700' : 'text-green-700'}>
							{error || "Message sent successfully!"}
						</p>
					</div>
				</div>
			)}

			<Breadcrumbs title={"Contact"} pages={["Home", "Contact"]} />

			<div className='mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0'>
				<div className='flex flex-col overflow-hidden rounded-[20px] bg-gray-1 dark:bg-black md:flex-row'>
					<div className='w-full px-4 py-16 sm:px-7.5 lg:px-10 xl:px-16'>
						<form onSubmit={handleSubmit}>
							<div className='mb-5 w-full'>
								<label
									htmlFor='fullName'
									className='mb-2.5 block font-satoshi font-medium -tracking-[0.2px] text-dark dark:text-white'
								>
									Full Name
								</label>

								<input
									type='text'
									name='fullName'
									id='fullName'
									value={formData.fullName}
									onChange={handleChange}
									placeholder='Enter your full name'
									className='w-full rounded-[10px] border border-stroke bg-white px-6 py-3 outline-none duration-200 placeholder:text-dark-5 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-black'
								/>
							</div>

							<div className='mb-5 w-full'>
								<label
									htmlFor='email'
									className='mb-2.5 block font-satoshi font-medium -tracking-[0.2px] text-dark dark:text-white'
								>
									Email
								</label>

								<input
									type='email'
									name='email'
									id='email'
									value={formData.email}
									onChange={handleChange}
									placeholder='Enter your Email'
									className='w-full rounded-[10px] border border-stroke bg-white px-6 py-3 outline-none duration-200 placeholder:text-dark-5 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-black'
								/>
							</div>

							<div className='mb-7.5'>
								<label
									htmlFor='message'
									className='mb-2.5 block font-satoshi font-medium -tracking-[0.2px] text-dark dark:text-white'
								>
									Message
								</label>

								<textarea
									name='message'
									id='message'
									rows={5}
									value={formData.message}
									onChange={handleChange}
									placeholder='Type your message'
									className='w-full rounded-[10px] border border-stroke bg-white px-6 py-3 outline-none duration-200 placeholder:text-dark-5 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-black'
								></textarea>
							</div>

							<button
								type='submit'
								disabled={isSubmitting}
								className='flex w-full justify-center rounded-full bg-primary p-[13px] font-satoshi font-medium text-white duration-200 ease-out hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed'
							>
								{isSubmitting ? "Sending..." : "Send Message"}
							</button>
						</form>
					</div>

					{/* Rest of your component (right side) remains the same */}
					<div className='relative z-1 flex w-full max-w-[570px] items-center justify-center bg-black p-4 py-15 sm:p-7.5'>
						{/* Your existing image components... */}
						<div>
							<h2 className='mb-5 max-w-[357px] font-satoshi text-custom-3xl font-bold -tracking-[1.3px] text-white'>
								Need any help? Just open a support ticket
							</h2>
							<p className='max-w-[270px] text-gray-5'>
								Our support team will get back to as soon as they can.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;