import Link from "next/link";
import Image from 'next/image';

const Footer = () => {
	return (
		<footer className='relative z-1 mt-auto overflow-hidden bg-black py-20'>
			<div className='mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0'>
				<div className='grid grid-cols-1 gap-10 md:grid-cols-4'>
					{/* Company Info */}
					<div className='col-span-1 md:col-span-1'>
						<Link href='/'>
							<Image
								src={"/images/logo/logo-light.svg"}
								alt='VisionTrack'
								width={214}
								height={40}
							/>
						</Link>
						<p className='mt-5 text-gray-300'>
							Enterprise-grade video intelligence platform
						</p>
					</div>

					{/* Product */}
					<div>
						<h2 className='mb-5 text-lg font-bold text-white'>
							Product
						</h2>
						<ul className='space-y-3'>
							<li><Link href='/#features' className='text-gray-300 hover:text-white'>Features</Link></li>
							<li><Link href='/#pricing' className='text-gray-300 hover:text-white'>Pricing</Link></li>
							<li><Link href='/request-demo' className='text-gray-300 hover:text-white'>Request Demo</Link></li>
						</ul>
					</div>

					{/* Solutions */}
					<div>
						<h2 className='mb-5 text-lg font-bold text-white'>
							Solutions
						</h2>
						<ul className='space-y-3'>
							<li><Link href='#' className='text-gray-300 hover:text-white'>Commercial Real Estate</Link></li>
							<li><Link href='#' className='text-gray-300 hover:text-white'>Multi-family Residential</Link></li>
							<li><Link href='#' className='text-gray-300 hover:text-white'>Retail Operations</Link></li>
						</ul>
					</div>

					{/* Company */}
					<div>
						<h2 className='mb-5 text-lg font-bold text-white'>
							Company
						</h2>
						<ul className='space-y-3'>
							<li><Link href='/contact' className='text-gray-300 hover:text-white'>Contact</Link></li>
							<li><Link href='/#' className='text-gray-300 hover:text-white'>Privacy Policy</Link></li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;