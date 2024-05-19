const Social = () => {
	return (
		<div className="flex flex-col relative">
			<img src="/images/blue-icon.png" className="absolute top-[-17px] left-1/2 -translate-x-1/2 w-[77px] h-[77px]" />
			<img src="/images/banner.png" />
			<div className="flex flex-col pt-[42px] pb-[29px] px-[26px] relative overflow-hidden">
				<div className="absolute top-[-32px] left-1/2 -translate-x-1/2 bg-[#033067F7] blur-[100px] w-[196px] h-[104px]" />
				<div className="flex flex-col sm:flex-row space-y-2 sm:space-x-[9px] sm:space-y-0 font-medium text-[18px] z-[1]">
					<a className="flex justify-center items-center space-x-1 flex-1 bg-[#12121278] border-2 border-[#292929] min-h-[50px] rounded-[7px] transition hover:scale-105" href="https://twitter.com/SageERC314">
						<img src="/images/twitter.svg" />
						<span>Twitter</span>
					</a>
					<a className="flex justify-center items-center space-x-1 flex-1 bg-[#12121278] border-2 border-[#292929] min-h-[50px] rounded-[7px] transition hover:scale-105" href="https://sageterminal.io">
						<img src="/images/website.svg" />
						<span>Website</span>
					</a>
					<a className="flex justify-center items-center space-x-1 flex-1 bg-[#12121278] border-2 border-[#292929] min-h-[50px] rounded-[7px] transition hover:scale-105" href="https://t.me/Sage_ERC314">
						<img src="/images/telegram.svg" />
						<span>Telegram</span>
					</a>
				</div>
				<span className="mt-[30px] font-bold text-[16px] sm:text-[20px] leading-[19.96px] sm:leading-[23.96px]">Sage Trading Terminal</span>
				<span className="mt-[15px] font-medium text-[14px] sm:text-[17px] leading-[17.28px] sm:leading-[20.28px] text-[#676770]">Transforming the Ethereum trading experience: Triple the efficiency, One-Third the gas on your swaps.</span>
				<div className="h-[2px] bg-[#4B4B4B] mt-[33px] mb-[30px]" />
				<button className="flex justify-center items-center space-x-[7px] bg-[#0085FF] h-[50px] rounded-[7px] transition hover:scale-105">
					<img src="/images/liquidity.svg" />
					<span className="font-medium text-[14px] sm:text-[17px] leading-[17.28px] sm:leading-[20.28px] text-black">Liquidity Locked</span>
				</button>
			</div>
			{/* <div className="flex space-x-[9px] h-[50px] ">
				<button className="flex justify-center items-center bg-[#121212] border-2 border-[#292929] flex-1 rounded-[7px]">
					<img src="/images/alert.svg" />
					<span>Get Alerts</span>
				</button>
				<button className="flex justify-center items-center bg-[#121212] border-2 border-[#292929] flex-1 rounded-[7px]">
					<img src="/images/watchlist.svg" />
					<span>Watchlist</span>
				</button>
			</div> */}
		</div>
	)
}

export default Social