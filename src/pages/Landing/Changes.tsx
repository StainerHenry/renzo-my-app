import useTokenInfo from "../../hooks/useTokenInfo"

const Changes = () => {
    const { volume, ethPrice, buys, sells } = useTokenInfo();
    //console.log(buys, sells)
    return (
        <div className="flex flex-col border-2 border-[#292929] rounded-b-[7px]">
            {/* <div className="flex border-b-2 border-[#292929] h-[76px]">
                <div className="flex flex-col justify-center items-center flex-1 border-r-2 border-[#292929]">
                    <span className="font-medium text-[15px] leading-[18px] opacity-70">5M</span>
                    <span className="font-bold text-[23px] leading-[27.6px] text-[#FF2E3A]">-2.05%</span>
                </div>
                <div className="flex flex-col justify-center items-center flex-1 border-r-2 border-[#292929]">
                    <span className="font-medium text-[15px] leading-[18px] opacity-70">1H</span>
                    <span className="font-bold text-[23px] leading-[27.6px] text-[#51E5A3]">+8.05%</span>
                </div>
                <div className="flex flex-col justify-center items-center flex-1 border-r-2 border-[#292929]">
                    <span className="font-medium text-[15px] leading-[18px] opacity-70">6H</span>
                    <span className="font-bold text-[23px] leading-[27.6px] text-[#51E5A3]">+3.05%</span>
                </div>
                <div className="flex flex-col justify-center items-center flex-1 bg-[#121212]">
                    <span className="font-medium text-[15px] leading-[18px] opacity-70">24H</span>
                    <span className="font-bold text-[23px] leading-[27.6px] text-[#FF2E3A]">-1
                        .05%</span>
                </div>
            </div> */}
            <div className="flex p-6">
                <div className="flex flex-col space-y-[30px]">
                    {/* <div className="flex flex-col space-y-[5px]">
                        <span className="font-medium text-[12px] sm:text-[15px] leading-[15px] sm:leading-[18px] opacity-70">TXNS</span>
                        <span className="font-bold text-[15px] sm:text-[20px] leading-[18.96px] sm:leading-[23.96px]">4,432</span>
                    </div> */}
                    <div className="flex flex-col space-y-[5px]">
                        <span className="font-medium text-[12px] sm:text-[15px] leading-[15px] sm:leading-[18px] opacity-70">Volume</span>
                        <span className="font-bold text-[15px] sm:text-[20px] leading-[18.96px] sm:leading-[23.96px]">{(volume * ethPrice / 1000000).toFixed(0)}M</span>
                    </div>
                    {/* <div className="flex flex-col space-y-[5px]">
                        <span className="font-medium text-[12px] sm:text-[15px] leading-[15px] sm:leading-[18px] opacity-70">Markers</span>
                        <span className="font-bold text-[15px] sm:text-[20px] leading-[18.96px] sm:leading-[23.96px]">4,432</span>
                    </div> */}
                </div>
                <div className="ml-[33px] mr-[18px] w-[2px] h-full bg-[#292929]" />
                <div className="flex flex-col space-y-[25px] flex-1">
                    <div className="flex flex-col space-y-1">
                        <div className="flex justify-between space-x-2">
                            <div className="flex flex-col">
                                <span className="font-medium text-[12px] sm:text-[15px] leading-[15px] sm:leading-[18px]">Buys</span>
                                <span className="font-bold text-[15px] sm:text-[20px] leading-[18.96px] sm:leading-[23.96px]">{buys}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium text-[12px] sm:text-[15px] leading-[15px] sm:leading-[18px]">Sells</span>
                                <span className="font-bold text-[15px] sm:text-[20px] leading-[18.96px] sm:leading-[23.96px]">{sells}</span>
                            </div>
                        </div>
                        <div className="bg-[#FF2E3A] h-[5px] relative">
                            <div className="bg-[#51E5A3] w-1/2 h-full absolute top-0 left-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Changes