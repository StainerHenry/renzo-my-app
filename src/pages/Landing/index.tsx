import Changes from "./Changes"
import Chart from "./Chart"
import Info from "./Info"
import Sidebar from "./Sidebar"
import Swap from "./Swap"
import ConnectWallet from "../../components/ConnectWallet"
import Table from "./Table"
import { useState } from "react"
import clsx from "clsx"

const Landing = () => {
	const [isBuy, setIsBuy] = useState(true);

	return (
		<div className="flex flex-col h-screen">
			<div className="flex justify-end mb-5 p-[25px] pb-0"><ConnectWallet /></div>
			<div className="flex flex-col 1xl:flex-row 1xl:items-start bg-[#070707] p-[25px] pt-0 1xl:flex-1 1xl:h-0">
				<Sidebar />
				<div className="flex flex-col 1xl:flex-row 1xl:flex-1 1xl:w-0 mt-5 1xl:ml-5 1xl:mt-0 1xl:h-full">
					<div className="flex flex-col space-y-[18px] 1xl:flex-1 1xl:w-0">
						{/* chart */}
						<Chart/>
						<div className="flex flex-col border-2 border-[#292929] flex-1 h-0 overflow-auto">
							<div className="flex space-x-2.5 bg-[#121212] border-b-2 border-[#292929]">
								<button className="flex justify-center items-center p-[15px] h-[57px] relative overflow-hidden group">
									<img src="/images/transactions.svg" alt="" />
									<span className="origin-left transition group-hover:scale-110 ml-1.5 font-bold text-[14px] sm:text-[17px] leading-[17.37px] sm:leading-[20.37px]">Transactions</span>
									<div className="w-full h-[2px] absolute bottom-0 left-0 bg-white" />
								</button>
								<button className="flex justify-center items-center p-[15px] h-[57px] relative overflow-hidden group">
									<img src="/images/toptraders.svg" alt="" />
									<span className="origin-left transition group-hover:scale-110 ml-1.5 font-bold text-[14px] sm:text-[17px] leading-[17.37px] sm:leading-[20.37px]">Top Traders</span>
									{/* <div className="w-full h-[2px] absolute bottom-0 left-0 bg-white" /> */}
								</button>
							</div>
							<Table />
						</div>
					</div>
					<div className="flex flex-col bg-[#0A0A0A] border-2 border-[#292929] 1xl:w-[350px] 3xl:w-[462px] px-[22px] py-[26px] mt-[17px] 1xl:ml-[17px] 1xl:mt-0 overflow-auto">
						<div className="flex flex-col space-y-[15px]">
							<Info />
							<Changes />
						</div>
						<div className="flex space-x-[13.94px] mt-[14px] h-[50px] rounded-[7px]">
							<button className={clsx("flex justify-center items-center flex-1 transition hover:scale-105 rounded-tl-[7px] rounded-tr-[24.5px] font-medium text-[16px] sm:text-[20px]", 
								{
									"bg-[#51E5A3]": isBuy,
									"text-[#121212]": isBuy,
									"border-2": !isBuy,
									"border-[#292929]": !isBuy,
									"bg-gradient1": !isBuy
								}
							)} onClick={() => setIsBuy(true)}>Buy</button>
							<button className={clsx("flex justify-center items-center flex-1 transition hover:scale-105 rounded-tr-[7px] rounded-bl-[24.5px] font-medium text-[16px] sm:text-[20px]", 
								{
									"bg-[#51E5A3]": !isBuy,
									"text-[#121212]": !isBuy,
									"border-2": isBuy,
									"border-[#292929]": isBuy,
									"bg-gradient1": isBuy
								}
							)} onClick={() => setIsBuy(false)}>Sell</button>
						</div>
						<Swap isBuy={isBuy} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Landing