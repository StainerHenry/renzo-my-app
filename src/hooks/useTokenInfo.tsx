import { SAGE_TOKEN } from "../abis/addresses";
import SAGE_TOKEN_ABI from "../abis/SAGE_TOKEN_ABI.json";
import ERC20_ABI from "../abis/ERC20_ABI.json";

import Web3 from "web3";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import axios from "axios";

const defaultValues = {
    txs: [],
    ethBalance: 0,
    sageBalance: 0,
    ethPrice: 0,
    liquidity: 0,
    volume: 0,
    sagePrice: 0,
    pooledSage: 0,
    buys: 0,
    sells: 0,
    getTokenInfo: () => {},
    getTransactionsInfo: () => {},
}

export const TokenInfoContext = React.createContext(defaultValues);

export default function useTokenInfo() {
    return React.useContext(TokenInfoContext);
}

export function TokenInfoProvider({ children }: any) {
    const { address } = useAccount();

    const [txs, setTxs] = useState([]);
    const [ethBalance, setEthBalance] = useState(0);
    const [sageBalance, setSageBalance] = useState(0);
    const [ethPrice, setEthPrice] = useState(0);
    const [liquidity, setLiquidity] = useState(0);
    const [pooledSage, setPooledSage] = useState(0);
    const [volume, setVolume] = useState(0);
    const [sagePrice, setSagePrice] = useState(0);
    const [buys, setBuys] = useState(0);
    const [sells, setSells] = useState(0);
    

    async function getTokenInfo() {
        try {
            const web3 = new Web3("https://ethereum.publicnode.com");
            
            let data;
            if (address) {
                data = await web3.eth.getBalance(address);
                setEthBalance(Number(data) / Math.pow(10, 18));
            }

            let contract = new web3.eth.Contract(ERC20_ABI, SAGE_TOKEN);
            data = await contract.methods.balanceOf(address).call();
            setSageBalance(Number(data) / Math.pow(10, 18));

            contract = new web3.eth.Contract(SAGE_TOKEN_ABI, SAGE_TOKEN);
            data = await contract.methods.accruedFeeAmount().call();
            setVolume(Number(data) * 100 / 1e18);

            data = await contract.methods.getReserves().call();
            setLiquidity(Number(data[0]) / Math.pow(10, 18));
            setPooledSage(Number(data[1]) / Math.pow(10, 18));
        } catch (err) {
            console.log(err);
        }
    }

    async function getTransactionsInfo() {
        try {
            let res = await axios.get('https://blackrockfund-server.vercel.app/txs/all');
            setTxs(res.data);
            setSagePrice(res.data[0].price)

            setBuys(res.data.reduce((sum, tx) => sum + (tx.tp == 'Buy' ? 1 : 0), 0));
            setSells(res.data.reduce((sum, tx) => sum + (tx.tp == 'Sell' ? 1 : 0), 0));
            

            let ethPrice = (await axios.get('https://api.dexscreener.com/latest/dex/pairs/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640')).data.pair.priceUsd;
            setEthPrice(ethPrice);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getTokenInfo();
            getTransactionsInfo();
        }, 15000)
        return () => clearInterval(interval)
    }, [])

    return (
        <TokenInfoContext.Provider
            value={{
                txs,
                ethBalance,
                sageBalance,
                ethPrice,
                liquidity,
                volume,
                sagePrice,
                pooledSage,
                buys,
                sells,
                getTokenInfo,
                getTransactionsInfo
            }}
            children={children}
        />
    );
}