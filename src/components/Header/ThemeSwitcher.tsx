import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className='relative z-10 h-9 w-[36px] flex cursor-pointer items-center justify-between rounded-lg dark:bg-white/5'
		>
          <span className='hidden items-center justify-center text-dark dark:flex dark:text-white'>
             <svg
				 width='20'
				 height='20'
				 viewBox='0 0 20 20'
				 fill='none'
				 xmlns='http://www.w3.org/2000/svg'
			 >
                <path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M9.99996 1.04167C10.3451 1.04167 10.625 1.32149 10.625 1.66667V2.50001C10.625 2.84518 10.3451 3.12501 9.99996 3.12501C9.65478 3.12501 9.37496 2.84518 9.37496 2.50001V1.66667C9.37496 1.32149 9.65478 1.04167 9.99996 1.04167ZM3.66547 3.66551C3.90955 3.42144 4.30527 3.42144 4.54935 3.66551L4.87672 3.99288C5.12079 4.23696 5.12079 4.63268 4.87672 4.87676C4.63264 5.12084 4.23691 5.12084 3.99283 4.87676L3.66547 4.5494C3.42139 4.30532 3.42139 3.90959 3.66547 3.66551ZM16.3342 3.66573C16.5783 3.90981 16.5783 4.30554 16.3342 4.54961L16.0069 4.87698C15.7628 5.12106 15.3671 5.12105 15.123 4.87698C14.8789 4.6329 14.8789 4.23717 15.123 3.99309L15.4504 3.66573C15.6944 3.42165 16.0902 3.42165 16.3342 3.66573ZM9.99996 5.62501C7.58371 5.62501 5.62496 7.58376 5.62496 10C5.62496 12.4163 7.58371 14.375 9.99996 14.375C12.4162 14.375 14.375 12.4163 14.375 10C14.375 7.58376 12.4162 5.62501 9.99996 5.62501ZM4.37496 10C4.37496 6.8934 6.89336 4.37501 9.99996 4.37501C13.1066 4.37501 15.625 6.8934 15.625 10C15.625 13.1066 13.1066 15.625 9.99996 15.625C6.89336 15.625 4.37496 13.1066 4.37496 10ZM1.04163 10C1.04163 9.65483 1.32145 9.37501 1.66663 9.37501H2.49996C2.84514 9.37501 3.12496 9.65483 3.12496 10C3.12496 10.3452 2.84514 10.625 2.49996 10.625H1.66663C1.32145 10.625 1.04163 10.3452 1.04163 10ZM16.875 10C16.875 9.65483 17.1548 9.37501 17.5 9.37501H18.3333C18.6785 9.37501 18.9583 9.65483 18.9583 10C18.9583 10.3452 18.6785 10.625 18.3333 10.625H17.5C17.1548 10.625 16.875 10.3452 16.875 10ZM15.123 15.123C15.3671 14.879 15.7628 14.879 16.0069 15.123L16.3342 15.4504C16.5783 15.6945 16.5783 16.0902 16.3342 16.3343C16.0902 16.5784 15.6944 16.5784 15.4504 16.3343L15.123 16.0069C14.8789 15.7628 14.8789 15.3671 15.123 15.123ZM4.87672 15.1232C5.12079 15.3673 5.12079 15.7631 4.87672 16.0071L4.54935 16.3345C4.30527 16.5786 3.90955 16.5786 3.66547 16.3345C3.42139 16.0904 3.42139 15.6947 3.66547 15.4506L3.99283 15.1232C4.23691 14.8792 4.63264 14.8792 4.87672 15.1232ZM9.99996 16.875C10.3451 16.875 10.625 17.1548 10.625 17.5V18.3333C10.625 18.6785 10.3451 18.9583 9.99996 18.9583C9.65478 18.9583 9.37496 18.6785 9.37496 18.3333V17.5C9.37496 17.1548 9.65478 16.875 9.99996 16.875Z'
					fill='currentColor'
				/>
             </svg>
          </span>

			<span className='flex items-center justify-center text-dark dark:hidden dark:text-white'>
             <svg
				 width='20'
				 height='20'
				 viewBox='0 0 20 20'
				 fill='none'
				 xmlns='http://www.w3.org/2000/svg'
			 >
                <path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M9.18112 2.33465C5.30889 2.74352 2.29163 6.0194 2.29163 10C2.29163 14.2572 5.74276 17.7083 9.99996 17.7083C13.9806 17.7083 17.2564 14.6911 17.6653 10.8188C16.5597 12.2224 14.8438 13.125 12.9166 13.125C9.57991 13.125 6.87496 10.4201 6.87496 7.08334C6.87496 5.15616 7.77759 3.44025 9.18112 2.33465ZM1.04163 10C1.04163 5.05245 5.05241 1.04167 9.99996 1.04167C10.5972 1.04167 10.8961 1.51772 10.9473 1.89689C10.9966 2.26165 10.8618 2.72555 10.4425 2.9789C9.05217 3.81901 8.12496 5.34319 8.12496 7.08334C8.12496 9.7297 10.2703 11.875 12.9166 11.875C14.6568 11.875 16.181 10.9478 17.0211 9.55748C17.2744 9.13821 17.7383 9.00337 18.1031 9.05264C18.4822 9.10384 18.9583 9.40281 18.9583 10C18.9583 14.9476 14.9475 18.9583 9.99996 18.9583C5.05241 18.9583 1.04163 14.9476 1.04163 10Z'
					fill='currentColor'
				/>
             </svg>
          </span>
		</button>
	);
}