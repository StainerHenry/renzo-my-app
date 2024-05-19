import clsx from "clsx";
import useTokenInfo from "../../hooks/useTokenInfo"

const ExternalSvg = ({ className }: any) => {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4445 20H3.33334C2.44291 20 1.60585 19.6532 0.976287 19.0236C0.346725 18.394 0 17.557 0 16.6666V5.55555C0 4.66516 0.346764 3.82811 0.976325 3.19855C1.60589 2.569 2.44295 2.22223 3.33338 2.22223H7.77784C8.39153 2.22223 8.88897 2.71967 8.88897 3.33335C8.88897 3.94703 8.39153 4.44447 7.77784 4.44447H3.33334C3.03653 4.44447 2.75754 4.56006 2.54771 4.76988C2.33788 4.97971 2.22225 5.25874 2.22225 5.55555V16.6666C2.22225 16.9635 2.33784 17.2424 2.54771 17.4524C2.75754 17.6621 3.03653 17.7778 3.33334 17.7778H14.4445C14.7413 17.7778 15.0203 17.6622 15.2302 17.4523C15.44 17.2424 15.5556 16.9634 15.5556 16.6666V12.2222C15.5556 11.6085 16.053 11.1111 16.6667 11.1111C17.2804 11.1111 17.7779 11.6086 17.7779 12.2222V16.6666C17.7779 17.557 17.4311 18.394 16.8015 19.0237C16.1719 19.6532 15.3348 20 14.4445 20ZM7.77784 13.3333C7.49345 13.3333 7.2091 13.2248 6.99217 13.0079C6.55827 12.574 6.55827 11.8704 6.99217 11.4365L16.2065 2.22223H12.2223C11.6086 2.22223 11.1112 1.7248 11.1112 1.11112C11.1112 0.497435 11.6086 0 12.2223 0H18.889C19.0427 0 19.1891 0.0312062 19.3222 0.0876023C19.4464 0.140156 19.5631 0.216308 19.6652 0.316098L19.6653 0.316176C19.666 0.316913 19.6667 0.317612 19.6674 0.318349C19.6676 0.318543 19.6679 0.318776 19.6681 0.31897C19.6686 0.319514 19.6693 0.320096 19.6698 0.320678C19.6702 0.321066 19.6705 0.321416 19.6709 0.321804C19.6714 0.322231 19.6718 0.322696 19.6722 0.323046C19.673 0.323822 19.6738 0.324637 19.6746 0.325452C19.6754 0.326228 19.6762 0.327082 19.677 0.327859C19.6774 0.328247 19.6779 0.328751 19.6782 0.329101C19.6786 0.329489 19.6789 0.329838 19.6793 0.330226C19.6799 0.330809 19.6805 0.331352 19.681 0.331973C19.6812 0.332128 19.6815 0.3324 19.6816 0.332594C19.6824 0.333331 19.6831 0.334069 19.6838 0.334806L19.6839 0.334884C19.7837 0.437041 19.8598 0.553715 19.9124 0.677919C19.9688 0.811049 20 0.957377 20 1.11108V7.77774C20 8.39143 19.5025 8.88886 18.8888 8.88886C18.2751 8.88886 17.7777 8.39143 17.7777 7.77774V3.7936L8.56332 13.0079C8.34655 13.2249 8.0622 13.3333 7.77784 13.3333Z" />
        </svg>
    )
}

const Table = () => {
    const { txs, ethPrice } = useTokenInfo();

    return (
        <div className="overflow-auto max-h-[300px] 1xl:max-h-[unset]">
            <table className="bg-[#0A0A0A] w-full h-full overflow-y-auto">
                <thead className="">
                    <th className="p-3">
                        <div className="flex items-center space-x-[5px]">
                            <span className="opacity-70 font-medium text-[15px] leading-[18px]">Date</span>
                            <img src="/images/table/date.svg" />
                        </div>
                    </th>
                    <th className="p-3">
                        <div className="flex items-center space-x-[5px]">
                            <span className="opacity-70 font-medium text-[15px] leading-[18px]">Type</span>
                        </div>
                    </th>
                    <th className="p-3">
                        <div className="flex items-center space-x-[5px]">
                            <span className="opacity-70 font-medium text-[15px] leading-[18px]">USD</span>
                        </div>
                    </th>
                    <th className="p-3">
                        <div className="flex items-center space-x-[5px]">
                            <span className="opacity-70 font-medium text-[15px] leading-[18px]">ETH</span>
                        </div>
                    </th>
                    {/* <th className="p-3">
                        <div className="flex items-center space-x-[5px]">
                            <span className="opacity-70 font-medium text-[15px] leading-[18px]">SOL</span>
                            <img src="/images/table/filter.svg" />
                        </div>
                    </th> */}
                    <th className="p-3">
                        <div className="flex items-center space-x-[5px]">
                            <span className="opacity-70 font-medium text-[15px] leading-[18px]">Sage</span>
                        </div>
                    </th>
                    <th className="p-3">
                        <div className="flex items-center space-x-[5px]">
                            <span className="opacity-70 font-medium text-[15px] leading-[18px]">Price</span>
                        </div>
                    </th>
                    {/* <th className="p-3">
                        <div className="flex items-center space-x-[5px]">
                            <span className="opacity-70 font-medium text-[15px] leading-[18px]">Marker</span>
                            <img src="/images/table/filter.svg" />
                        </div>
                    </th>
                    <th className="p-3">
                        <span className="opacity-70 font-medium text-[15px] leading-[18px]">TXN</span>
                    </th> */}
                </thead>
                <tbody>
                    {
                        txs.map((data, i) => {
                            return (<tr className={clsx("font-medium text-[13px] leading-[16px]", {
                                "text-[#00CE07]": data.tp == "Buy",
                                "text-[#DB0000]": data.tp == "Sell"
                            })}>
                                <td className="py-[13px] px-3">{data.date}</td>
                                <td className="py-[13px] px-3">{data.tp}</td>
                                <td className="py-[13px] px-3">{(Number(data.eth) * Number(ethPrice)).toFixed(2)}</td>
                                <td className="py-[13px] px-3">{data.eth.toFixed(2)}</td>
                                <td className="py-[13px] px-3">{data.token.toFixed(2)}</td>
                                <td className="py-[13px] px-3">{(data.price * ethPrice).toFixed(2)}</td>
                                {/* <td className="py-[13px] px-3">
                                    <div className="flex items-start space-x-1">
                                        <img src="/images/table/marker1.svg" />
                                        <div className="flex flex-col space-y-1 mt-[-2px]">
                                            <span>XGgvG4</span>
                                            <div className="bg-[rgba(255,255,255,.42)] border h-[3px] relative">
                                                <div className="absolute w-1/2 h-full bg-white" />
                                            </div>
                                        </div>
                                        <img className="w-[15px] h-[15px]" src="/images/table/filter.svg" />
                                    </div>
                                </td>
                                <td className="p-1">
                                    <button className="flex justify-center items-center bg-[#121212] border-2 border-[#292929] w-full min-w-[42px] h-full min-h-[42px] group">
                                        <ExternalSvg className="transition group-hover:text-[#51E5A3]" />
                                    </button>
                                </td> */}
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Table