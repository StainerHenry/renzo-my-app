import { useEffect, useMemo, useRef, useState } from "react";
import { ColorType, CrosshairMode, LineStyle, createChart } from 'lightweight-charts';
import axios from "axios";

const url = "https://blackrockfund-server.vercel.app/"

export const ChartComponent = (props: any) => {
    const { data } = props;

    const chartContainerRef = useRef(null);

    const [series, setSeries] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({ width: (chartContainerRef as any).current.clientWidth });
        };

        const chart = createChart((chartContainerRef as any).current, {
            handleScale: { axisPressedMouseMove: !0 },
            layout: { background: { type: ColorType.Solid, color: "#01001E" }, textColor: "#FFF", fontSize: 15, fontFamily: "Haas" },
            width: (chartContainerRef as any).current.clientWidth,
            height: 400,
            grid: {
                vertLines: {
                    color: '#171718',
                    style: LineStyle.Solid,
                },
                horzLines: {
                    color: '#171718',
                    style: LineStyle.Solid,
                },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            rightPriceScale: { borderColor: "#1717188F" },
            timeScale: { borderColor: "#1717188F", timeVisible: true },
        });
        chart.timeScale().fitContent();

        const newSeries = chart.addCandlestickSeries({
            wickUpColor: '#51E5A3',
            upColor: '#51E5A3',
            borderUpColor: '#51E5A3',
            wickDownColor: '#FF2E3A',
            downColor: '#FF2E3A',
            borderDownColor: '#FF2E3A',
        });
        newSeries.setData(data);
        setSeries(newSeries);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }, []);

    useEffect(() => {
        if (series != null) {
            let currentBars = series.data();
            for (let i = currentBars.length - 1; i < data.length; i++) {
                series.update(data[i]);
            }
        }
    }, [data])

    return (
        <div
            ref={chartContainerRef}
        />
    );
};

const Chart = () => {
    const [data, setData] = useState([]);

    useMemo(async () => {
        let ethprice = (await axios.get('https://api.dexscreener.com/latest/dex/pairs/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640')).data.pair.priceUsd;
        let chartTxs = await axios.get('https://blackrockfund-server.vercel.app/chart')
        setData(chartTxs.data.map(tx => {
            return {
                open: tx.open * ethprice,
                close: tx.close * ethprice,
                high: tx.high * ethprice,
                low: tx.low * ethprice,
                time: tx.time
            }
        }));
        const interval = setInterval(async () => {
            let ethprice = (await axios.get('https://api.dexscreener.com/latest/dex/pairs/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640')).data.pair.priceUsd;
                  let chartTxs = await axios.get('https://blackrockfund-server.vercel.app/chart')
            setData(chartTxs.data.map(tx => {
              return {
                open: tx.open * ethprice,
                close: tx.close * ethprice,
                high: tx.high * ethprice,
                low: tx.low * ethprice,
                time: tx.time
              }
            }))
        }, 15000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className='border-2 border-[#292929]'>
            {data?.length > 0 &&
                <ChartComponent data={data}></ChartComponent>
            }
        </div>
    )
}

export default Chart

// import { useEffect, useCallback, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Datafeed from './datafeeds';
// import axios from 'axios';

// const Chart = ({ contractAddr }: any) => {
//     const location = useLocation();
//     const [symbol, setSymbol] = useState();

//     const getParameterByName = (name: any) => {
//         name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//         var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//             results = regex.exec(location.search);
//         return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
//     }

//     const checkDarkMode = () => {
//         return document.body.classList.contains("dark");
//     }

//     const [isDarkMode, setIsDarkMode] = useState(checkDarkMode());

//     useEffect(() => {
//         setIsDarkMode(checkDarkMode);

//         const mutationObserver = new MutationObserver((mutations) => {
//             mutations.forEach((mutation) => {
//                 if (mutation.attributeName === "class") {
//                     setIsDarkMode(checkDarkMode());
//                 }
//             });
//         });

//         mutationObserver.observe(document.body, { attributes: true });

//         return () => {
//             mutationObserver.disconnect();
//         };
//     }, []);

//     useEffect(() => {
//         if (!symbol) return;
//         var datafeedUrl = "https://demo-feed-data.tradingview.com";
//         var customDataUrl = getParameterByName('dataUrl');
//         if (customDataUrl !== "") {
//             datafeedUrl = customDataUrl.startsWith('https://') ? customDataUrl : `https://${customDataUrl}`;
//         }
//         var widget = (window as any).tvWidget = new (window as any).TradingView.widget({
//             // debug: true, // uncomment this line to see Library errors and warnings in the console
//             symbol: contractAddr,
//             // symbol: `Bitfinex:${symbol.name}`,
//             interval: '1D',
//             container: "tv_chart_container",
//             width: "100%",
//             height: "800px",

//             //	BEWARE: no trailing slash is expected in feed URL
//             datafeed: Datafeed as any,
//             library_path: "/charting_library/",
//             locale: getParameterByName('lang') || "en",

//             disabled_features: ["use_localstorage_for_settings"],
//             enabled_features: ["study_templates", "create_volume_indicator_by_default", "create_volume_indicator_by_default_once","volume_force_overlay"],
//             charts_storage_url: 'https://saveload.tradingview.com',
//             charts_storage_api_version: "1.1",
//             client_id: 'tradingview.com',
//             user_id: 'public_user_id',
//             custom_css_url: "/tradingViewStyles.css",
//             style: '1',
//             overrides: {
//                 "volume.transparency": 100,
//                 "paneProperties.separatorColor": "#292929",
//                 "paneProperties.vertGridProperties.color": "#292929",
//                 "paneProperties.horzGridProperties.color": "#1717188F",
//                 "paneProperties.background": "#070707",
//                 'mainSeriesProperties.candleStyle.upColor': '#51E5A3',
//                 'mainSeriesProperties.candleStyle.downColor': '#FF2E3A',
//                 'mainSeriesProperties.candleStyle.borderUpColor': '#51E5A3',
//                 'mainSeriesProperties.candleStyle.borderDownColor': '#FF2E3A',
//                 'mainSeriesProperties.candleStyle.wickUpColor': '#51E5A3',
//                 'mainSeriesProperties.candleStyle.wickDownColor': '#FF2E3A',
//                 'scalesProperties.textColor': '#292929',
//                 'scalesProperties.fontSize': 15,
//                 'scalesProperties.fontFamily': 'Haas'
//             },
//             studies_overrides: {
//                 "volume.transparency": 100,
//                 "bollinger bands.median.color": "#33FF88",
//                 "bollinger bands.upper.linewidth": 7
//             }
//         });
//         window.frames[0].focus();
//     }, [isDarkMode, symbol])

//     const getSymbols = useCallback(async (address: any) => {
//         const data = await axios.post('https://graph.defined.fi/graphql', {
//             "operationName": "GetSymbol",
//             "variables": {
//                 "currencyCode": "USD",
//                 "symbol": `${address}:1`
//             },
//             "query": "query GetSymbol($symbol: String!, $currencyCode: String) {\n  getSymbol(symbol: $symbol, currencyCode: $currencyCode) {\n    currency_code\n    description\n    name\n    original_currency_code\n    pricescale\n    ticker\n    supported_resolutions\n    __typename\n  }\n}"
//         }, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "5fd40a5b75f9012519a08931011110dd79a0aee8"
//             }
//         })
//         console.log(data)
//         setSymbol(data.data.data.getSymbol);
//     }, []);

//     useEffect(() => {
//         if (!contractAddr) return;
//         getSymbols(contractAddr);
//     }, [contractAddr])

//     return (
//         <div className='border-2 border-[#292929]'>
//             <div id="tv_chart_container"></div>
//         </div>
//     )
// }

// export default Chart;