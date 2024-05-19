import { SAGE_TOKEN } from "../../abis/addresses";
import useTokenInfo from "../../hooks/useTokenInfo";
import Social from "./Social"
import { useAccount } from "wagmi"

const Sidebar = () => {
	const { address } = useAccount();

	const { ethBalance, ethPrice, liquidity, pooledSage, sagePrice } = useTokenInfo();

	return (
		<div className="flex flex-col border-2 border-[#292929] 1xl:w-[350px] 3xl:w-[462px] 1xl:h-full 1xl:overflow-auto">
			<div className="flex justify-center px-6 py-[22px] border-b-2 border-[#292929]">
				<img className="h-[38px]" src="/images/logo.svg" alt="" />
			</div>
			<div className="flex justify-between items-center px-6 py-4 sm:py-[30px] border-b-2 border-[#292929]">
				<div className="flex items-center space-x-2">
					<img className="w-[34px]" src="/images/eth.svg" alt="" />
					<span className="font-bold text-[16px] sm:text-[21px] leading-[21.2px] sm:leading-[25.2px]">SAGE/ETH</span>
				</div>
				<div className="flex items-center space-x-[5px]">
					<span className="font-medium text-[16px] leading-[19.2px]">All Markets</span>
					<img className="w-[6px]" src="/images/arrow-down.svg" alt="" />
				</div>
			</div>
			<div className="flex flex-col space-y-2 px-6 py-[18px] border-b-2 border-[#292929]">
				<div className="flex justify-between items-center">
					<span className="font-medium text-[13px] sm:text-[17px] leading-[16.4px] sm:leading-[20.4px] opacity-70">Wallet</span>
					<div className="flex items-center space-x-[7px]">
						<button className="flex items-center space-x-[5px] px-2.5 py-1 bg-[#121212] border border-[#292929] rounded-[2px]">
							<img src="/images/metamask.svg" alt="" />
							<span className="font-medium text-[14px] sm:text-[17px] leading-[17.28px] sm:leading-[20.28px]">{address ? address.slice(0, 3) + "..." + address.slice(-3) : "None"}</span>
						</button>
						<img className="cursor-pointer" src="/images/pin.svg" alt="" />
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="font-medium text-[13px] sm:text-[17px] leading-[16.4px] sm:leading-[20.4px] opacity-70">Balance</span>
					<span className="font-medium text-[17px] leading-[20.4px]">{ethBalance.toFixed(2)} ETH</span>
				</div>
			</div>
			<Social />
			<div className="flex flex-col p-6 pt-0">
				<span className="font-medium text-[16px] sm:text-[20px] leading-[19.86px] sm:leading-[23.86px]">Summary</span>
				<div className="flex flex-col space-y-2 mt-[13px]">
					<div className="flex justify-between items-center">
						<span className="font-medium text-[12px] sm:text-[15px] leading-[15px] sm:leading-[18px] opacity-70">Pooled WETH</span>
						<span className="font-medium text-[14px] sm:text-[17px] leading-[17.28px] sm:leading-[20.28px]">{liquidity.toFixed(2)} (${(liquidity * ethPrice / 1000).toFixed(0)}K)</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-[12px] sm:text-[15px] leading-[15px] sm:leading-[18px] opacity-70">Pooled BTC</span>
						<span className="font-medium text-[14px] sm:text-[17px] leading-[17.28px] sm:leading-[20.28px]">{pooledSage.toFixed(2)} (${(pooledSage * sagePrice * ethPrice / 1000).toFixed(0)}K)</span>
					</div>
				</div>
				<div className="w-full h-[2px] bg-[#4B4B4B] my-3" />
				<div className="flex justify-between items-center">
					<span className="font-medium text-[12px] sm:text-[15px] leading-[15px] sm:leading-[18px] opacity-70">SAGE</span>
					<div className="flex items-center">
						<button className="flex items-center space-x-[5px] px-2.5 py-1 bg-[#121212] border border-[#292929] rounded-[2px]">
							<span className="font-medium text-[14px] sm:text-[17px] leading-[17.28px] sm:leading-[20.28px]">{SAGE_TOKEN.slice(0, 5) + "..." + SAGE_TOKEN.slice(-5)}</span>
						</button>
						<a href="https://etherscan.io/address/0xea277346e91f35b254232a07d9a08757e4c92564">
							<div className="flex h-[23px] ml-[11px]">
								
									<span className="self-end font-medium text-[14px] sm:text-[17px] leading-[17.28px] sm:leading-[20.28px]">LPs</span>
									<img className="self-start" src="/images/external.svg" alt="" />
								
							</div>
						</a>
						<a href="https://etherscan.io/address/0xea277346e91f35b254232a07d9a08757e4c92564">
							<div className="flex h-[23px] ml-[6px]">
								<span className="self-end font-medium text-[14px] sm:text-[17px] leading-[17.28px] sm:leading-[20.28px]">EXP</span>
								<img className="self-start" src="/images/external.svg" alt="" />
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sidebar