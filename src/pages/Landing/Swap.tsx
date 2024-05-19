import { useEffect, useState } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import Web3 from 'web3';
import { SAGE_TOKEN } from '../../abis/addresses';
import SAGE_TOKEN_ABI from '../../abis/SAGE_TOKEN_ABI.json'
import toast from 'react-hot-toast';
import { config } from '../../wagmi';
import { ethers } from "ethers";
import { useContractWrite } from 'wagmi';
import clsx from 'clsx';
import useTokenInfo from '../../hooks/useTokenInfo';

const title = "font-bold text-[16px] sm:text-[25px]"
const subtitle = "flex font-bold text-[32px] leading-[38.34px] text-right w-[100%]"
const description = "font-medium text-[13px] sm:text-[17px] leading-[16.4px] sm:leading-[20.4px] opacity-70"

var gradient: any = [
	[
		0, [255, 15, 80]
	],
	[
		30.04, [194, 99, 236]
	],
	[
		51.29, [18, 171, 255]
	],
	[
		65.51, [57, 211, 217]
	],
	[
		88.5, [75, 249, 212]
	],
	[
		100, [0, 255, 141]
	]
]

function pickHex(color1: any, color2: any, weight: any) {
	var p = weight;
	var w = p * 2 - 1;
	var w1 = (w / 1 + 1) / 2;
	var w2 = 1 - w1;
	var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
	Math.round(color1[1] * w1 + color2[1] * w2),
	Math.round(color1[2] * w1 + color2[2] * w2)];
	return rgb;
}

const Range = styled.input<any>`
	&::-webkit-slider-thumb {
		background: ${({ rangeColor }) => rangeColor};
		&:hover {
		background: ${({ rangeColor }) => rangeColor} !important;
		}
	  }
`;

const Swap = (props) => {

	//const { isBuy } = props;
	const { ethBalance, sageBalance } = useTokenInfo();

	const { isBuy } = props

	const [amount, setAmount] = useState(0);
	const [amountHolder, setAmountHolder] = useState("");
	const [slippage, setSlippage] = useState("5");
	const [amountOut, setAmountOut] = useState(0);
	const [rangeColor, setRangeColor] = useState("0");

	useEffect(() => {
		const web3 = new Web3("https://ethereum.publicnode.com");
		let contract = new web3.eth.Contract(SAGE_TOKEN_ABI, SAGE_TOKEN);
		contract.methods.getAmountOut(amount * 1e18, isBuy).call().then(res => {
			if (Number(res) / 1e18 > 0.001) setAmountOut(Number(res) / 1e18);
			else setAmountOut(0);
		});
	}, [amount]);

	useEffect(() => {
		setAmount(0);
		setAmountOut(0);
		setAmountHolder("");
	}, [isBuy]);

	useEffect(() => {
		const _slippage = parseFloat(slippage)
		var colorRange: any = []
		$.each(gradient, function (index: any, value: any) {
			if (_slippage <= value[0]) {
				if (index - 1 < 0) colorRange = [0, 1]
				else colorRange = [index - 1, index]
				return false;
			}
		});

		//Get the two closest colors
		var firstcolor = gradient[colorRange[0]][1];
		var secondcolor = gradient[colorRange[1]][1];

		//Calculate ratio between the two closest colors
		var firstcolor_x = 1089.66 * (gradient[colorRange[0]][0] / 100);
		var secondcolor_x = 1089.66 * (gradient[colorRange[1]][0] / 100) - firstcolor_x;
		var slider_x = 1089.66 * (_slippage / 100) - firstcolor_x;
		var ratio = slider_x / secondcolor_x

		//Get the color with pickHex(thx, less.js's mix function!)
		var result = pickHex(secondcolor, firstcolor, ratio);

		setRangeColor('rgb(' + result.join() + ')')
	}, [slippage]);

	const handleContractWrite = async (contractWrite: any) => {
		try {
			const data = await contractWrite();

			try {
				const tx = await config.publicClient.waitForTransactionReceipt(data.hash);
				toast.success("Swapped successfully.", {
					style: {
						border: '1px solid #713200',
						padding: '16px',
						color: '#00CD22',
					},
					position: "bottom-left",
					duration: 5000
				});
			} catch (error: any) {
				toast.error("Something went wrong.", {
					style: {
						border: '1px solid #713200',
						padding: '16px',
						color: '#FF0000',
					},
					position: "bottom-left",
					duration: 5000
				});
			}
		} catch (error: any) {
			toast.error("Something went wrong.", {
				style: {
					border: '1px solid #713200',
					padding: '16px',
					color: '#FF0000',
				},
				position: "top-right",
				duration: 5000
			})
		}
	};

	const { writeAsync: buy } = useContractWrite({
		address: SAGE_TOKEN,
		abi: SAGE_TOKEN_ABI,
		functionName: "buy",
		args: [ethers.parseEther((amountOut * (1 - Number(slippage) / 100)).toString())],
		value: ethers.parseEther(amount.toString())
	});

	const { writeAsync: sell } = useContractWrite({
		address: SAGE_TOKEN,
		abi: SAGE_TOKEN_ABI,
		functionName: "sell",
		args: [ethers.parseEther(amount.toString()), ethers.parseEther((amountOut * (1 - Number(slippage) / 100)).toString())],
	});

	return (
		<div className="flex flex-col mt-[14px] px-[25px] pt-5 pb-[15px] rounded-[7px] border-2 border-[#292929]">

			<div className="flex">

				<div className="flex flex-col space-y-[5px]">
					<span className="font-medium text-[16px] sm:text-[20px] leading-[19.86px] sm:leading-[23.86px]">Swap Tokens</span>
					<div className="flex items-center space-x-1">
						<img src="/images/sage.svg" />
						<span className="font-medium text-[15px] leading-[18px] opacity-50">SAGE/ETH</span>
						<img src="/images/arrow-down.svg" />
					</div>
				</div>
				<div className="w-[2px] bg-[#4B4B4B] ml-8 mr-7" />
				{/* <div className="flex flex-col space-y-1.5 flex-1">
					<div className="flex justify-between items-center">
						<span className="font-medium text-[15px] leading-[18px] opacity-50">Advanced Settings</span>
						<button className="w-10 h-[15px] bg-gradient1 relative border-2 border-[#292929] rounded-full">
							<div className="flex justify-center items-center w-[21px] h-[21px] bg-gradient1 border-2 border-[#292929] rounded-full absolute left-[-1px] top-1/2 -translate-y-1/2">
								<img src="/images/cog.svg" />
							</div>
						</button>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-[15px] leading-[18px] opacity-50">Insta Buy</span>
						<button className="w-10 h-[15px] bg-gradient1 relative border-2 border-[#51E5A3] rounded-full">
							<div className="flex justify-center items-center w-[21px] h-[21px] bg-[#51E5A3] rounded-full absolute left-[18px] top-1/2 -translate-y-1/2">
								<img src="/images/lightning.svg" />
							</div>
						</button>
					</div>
				</div> */}
			</div>
			<div className="flex flex-col space-y-2 px-5 py-[22px] border-2 border-[#292929] rounded-[7px] mt-4 relative">
				<div className="flex justify-between items-center">
					<div className='flex-1 ml-2'>
						<span className={subtitle}>
							<input
								placeholder='Amount'
								type='number'
								value={amountHolder}
								onChange={e => {
									if (e.target.value == "") {
										setAmount(0);
										setAmountHolder("");
									} else {
										setAmount(Number(e.target.value));
										setAmountHolder(e.target.value);
									}
								}}
								className="font-semibold text-[#FFF] py-3.5 flex-1 bg-transparent outline-none w-[100%] focus:border focus:border-white rounded-[10px] h-[1vh] text-[14px] sm:text-[20px] mr-1"
							></input>
						</span>
					</div>
					<div className="flex flex-col space-y-[3px] mr-2">
						<div className={title}>{isBuy ? "ETH" : "SAGE"}</div>
						{/* <span className={description}>Balance</span> */}
					</div>
					<button className="flex justify-center items-center absolute bottom-[-27px] left-1/2 -translate-x-1/2 bg-[#0F0F0F] border-2 border-[#292929] rounded-full w-10 sm:w-[46px] h-10 sm:h-[46px] group">
						<img className="w-5 sm:w-[23px] transition group-hover:rotate-180" src="/images/swap.svg" alt="" />
					</button>
				</div>
				<div className='flex items-center space-x-2 self-end'>
					<span className={description}>Balance: {isBuy ? ethBalance.toFixed(2) : sageBalance.toFixed(2)}</span>
					<button className='text-[#51E5A3] text-[13px] sm:text-[17px] leading-[16.4px] sm:leading-[20.4px]' onClick={() => {
						setAmount(ethBalance * 0.99);
						setAmountHolder((ethBalance * 0.99).toFixed(2))
					}}>Max</button>
				</div>
			</div>
			<div className="flex flex-col space-y-2 px-5 py-[22px] border-2 border-[#292929] rounded-[7px] mt-2">
				<div className="flex justify-between items-center">
					<div className='flex-1 ml-2'>
						<span className={subtitle}>
							<input disabled value={amountOut.toFixed(2)}
								className="font-semibold text-[#FFF] py-3.5 flex-1 bg-transparent outline-none w-[100%] focus:border focus:border-white rounded-[10px] h-[1vh] text-[14px] sm:text-[20px] mr-1"
							></input>
						</span>
					</div>
					<div className="flex flex-col space-y-[3px] mr-2">
						<div className={title}>{isBuy ? "SAGE" : "ETH"}</div>
						{/* <span className={description}>Balance</span> */}
					</div>
				</div>
				<div className='flex items-center space-x-2 self-end'>
					<span className={description}>Balance: {isBuy ? sageBalance.toFixed(2) : ethBalance.toFixed(2)}</span>
				</div>
			</div>
			<div className="flex justify-between items-center mt-5">
				<span className="font-medium text-[15px] leading-[17.89px]">Slippage</span>
				<span className="font-medium text-[15px] leading-[17.89px] opacity-70">{slippage}%</span>
			</div>
			<Range type="range" className="my-5 relative" value={slippage} onChange={(e: any) => setSlippage(e.target.value)} rangeColor={rangeColor} />
			<div className="flex justify-between items-center font-medium text-[15px] leading-[18px]">
				<span className="opacity-70">0%</span>
				<span className="opacity-70">100%</span>
			</div>
			<button className="flex justify-center items-center h-[50px] rounded-[7px] bg-[#0085FF] font-medium text-[16px] sm:text-[21px] text-black mt-4 transition hover:scale-105" onClick={() => {
				if (isBuy) {
					handleContractWrite(buy);
				} else {
					handleContractWrite(sell)
				}
			}}>
				Swap Tokens
			</button>
		</div>
	)
}

export default Swap