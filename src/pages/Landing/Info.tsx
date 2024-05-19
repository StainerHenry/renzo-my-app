import useTokenInfo from "../../hooks/useTokenInfo"

const container = "flex flex-col justify-center items-center space-y-[5px] flex-1 py-3 sm:py-[19px] rounded-[7px] bg-[#121212] border-2 border-[#292929]"
const title = "font-medium text-[12px] sm:text-[15px] leading-[15px] sm:leading-[18px] opacity-70"
const description = "font-bold text-[12px] sm:text-[22px] leading-[16.36px] sm:leading-[26.36px]"

const Info = () => {
	const { sagePrice, ethPrice, liquidity } = useTokenInfo();

	return (
		<div className="flex flex-col space-y-[9px]">
			<div className="flex space-x-[9px]">
				<div className={container}>
					<span className={title}>Price USD</span>
					<span className={description}>${(sagePrice * ethPrice).toFixed(2)}</span>
				</div>
				<div className={container}>
					<span className={title}>Price</span>
					<span className={description}>{sagePrice.toFixed(4)} ETH</span>
				</div>
			</div>
			<div className="flex space-x-[9px]">
				<div className={container}>
					<span className={title}>Liquidity</span>
					<span className={description}>{(liquidity * ethPrice / 1000).toFixed(0)}K</span>
				</div>
				<div className={container}>
					<span className={title}>FDV</span>
					<span className={description}>{(sagePrice * ethPrice).toFixed(0)}M</span>
				</div>
				<div className={container}>
					<span className={title}>MKT. Cap</span>
					<span className={description}>{(sagePrice * ethPrice * 800000 / 1000000).toFixed(0)}M</span>
				</div>
			</div>
		</div>
	)
}

export default Info