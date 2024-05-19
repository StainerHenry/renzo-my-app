import axios from 'axios';
import {
	makeApiRequest,
	generateSymbol,
	parseFullSymbol,
} from './helpers';
import {
	subscribeOnStream,
	unsubscribeFromStream,
} from './streaming';

const lastBarsCache = new Map();

// DatafeedConfiguration implementation
const configurationData = {
	// Represents the resolutions for bars supported by your datafeed
	supported_resolutions: ['1D', '1W', '1M'],

	// The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
	exchanges: [{
		value: 'Bitfinex',
		name: 'Bitfinex',
		desc: 'Bitfinex',
	},
	{
		value: 'Kraken',
		// Filter name
		name: 'Kraken',
		// Full exchange name displayed in the filter popup
		desc: 'Kraken bitcoin exchange',
	},
	{
		value: 'garantex',
		// Filter name
		name: 'Garantex',
		// Full exchange name displayed in the filter popup
		desc: 'Garantex exchange',
	},
	],
	// The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
	symbols_types: [{
		name: 'crypto',
		value: 'crypto',
	},
	],
};

// Obtains all symbols for all exchanges supported by CryptoCompare API
async function getAllSymbols() {
	const data = await makeApiRequest('data/v3/all/exchanges');
	let allSymbols:any = [];

	for (const exchange of configurationData.exchanges) {
		const pairs = data.Data[exchange.value].pairs;

		for (const leftPairPart of Object.keys(pairs)) {
			const symbols = pairs[leftPairPart].map((rightPairPart:any )=> {
				const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
				return {
					symbol: symbol.short,
					full_name: symbol.full,
					description: symbol.short,
					exchange: exchange.value,
					type: 'crypto',
				};
			});
			allSymbols = [...allSymbols, ...symbols];
		}
	}
	return allSymbols;
}

export default {
	onReady: (callback: any) => {
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData));
	},

	searchSymbols: async (
		userInput: any,
		exchange: any,
		symbolType: any,
		onResultReadyCallback: any,
	) => {
		console.log('[searchSymbols]: Method call');
		const symbols = await getAllSymbols();
		const newSymbols = symbols.filter((symbol:any) => {
			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
			const isFullSymbolContainsInput = symbol.full_name
				.toLowerCase()
				.indexOf(userInput.toLowerCase()) !== -1;
			return isExchangeValid && isFullSymbolContainsInput;
		});
		onResultReadyCallback(newSymbols);
	},

	resolveSymbol: async (
		symbolName: any,
		onSymbolResolvedCallback: any,
		onResolveErrorCallback: any,
		extension: any
	) => {
		console.log('[resolveSymbol]: Method call', symbolName);
		const data = await axios.post('https://graph.defined.fi/graphql', {
			"operationName": "GetSymbol",
			"variables": {
				"currencyCode": "USD",
				"symbol": `${symbolName}:1`
			},
			"query": "query GetSymbol($symbol: String!, $currencyCode: String) {\n  getSymbol(symbol: $symbol, currencyCode: $currencyCode) {\n    currency_code\n    description\n    name\n    original_currency_code\n    pricescale\n    ticker\n    supported_resolutions\n    __typename\n  }\n}"
		}, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "5fd40a5b75f9012519a08931011110dd79a0aee8"
			}
		})
		// const symbols = await getAllSymbols();
		// const symbolItem = symbols.find(({
		// 	full_name,
		// }) => full_name === symbolName);
		if (!data.data.data.getSymbol) {
			console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
			onResolveErrorCallback('cannot resolve symbol');
			return;
		}
		// Symbol information object
		const symbolInfo = {
			ticker: data.data.data.getSymbol.ticker,
			name: data.data.data.getSymbol.name,
			description: data.data.data.getSymbol.description,
			type: 'crypto',
			session: '24x7',
			timezone: 'Etc/UTC',
			minmov: 1,
			pricescale: data.data.data.getSymbol.pricescale,
			has_intraday: false,
			has_no_volume: true,
			has_weekly_and_monthly: false,
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: 2,
			data_status: 'streaming',
		};

		console.log('[resolveSymbol]: Symbol resolved', data.data.data.getSymbol.name);
		onSymbolResolvedCallback(symbolInfo);
	},

	getBars: async (symbolInfo: any, resolution: any, periodParams: any, onHistoryCallback: any, onErrorCallback: any) => {
		const { from, to } = periodParams;
		console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
		try {
			const data = await axios.post('https://graph.defined.fi/graphql', {
				"operationName": "GetBars",
				"variables": {
					"symbol": '0x3416cf6c708da44db2624d63ea0aaef7113527c6:1',
					"resolution": resolution,
					"from": from,
					"to": to,
					"currencyCode": "USD",
					"statsType": "UNFILTERED",
					"quoteToken": "token0"
				},
				"query": "query GetBars($symbol: String!, $from: Int!, $to: Int!, $resolution: String!, $currencyCode: String, $quoteToken: QuoteToken, $statsType: TokenPairStatisticsType) {\n  getBars(\n    symbol: $symbol\n    from: $from\n    to: $to\n    resolution: $resolution\n    currencyCode: $currencyCode\n    quoteToken: $quoteToken\n    statsType: $statsType\n  ) {\n    o\n    h\n    l\n    c\n    t\n    s\n    volume\n    __typename\n  }\n}"
			}, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "5fd40a5b75f9012519a08931011110dd79a0aee8"
				}
			})

			const _data = data.data.data
			if (_data.getBars === null) {
				return []
			}
			console.log(`Actually returned: ${new Date(from * 1000).toISOString()} - ${new Date(to * 1000).toISOString()}`)
			let bars = _data.getBars.t.map((time:any, i:number) => ({
				time: time * 1000,
				low: _data.getBars.l[i] ?? 0,
				high: _data.getBars.h[i] ?? 0,
				open: _data.getBars.o[i] ?? 0,
				close: _data.getBars.c[i] ?? 0,
				volume: _data.getBars.volume[i] ?? 0
			}))
			
			console.log(`[getBars]: returned ${bars.length} bar(s)`);
			onHistoryCallback(bars, {
				noData: false,
			});
		} catch (error) {
			console.log('[getBars]: Get error', error);
			onErrorCallback(error);
		}
	},

	subscribeBars: (
		symbolInfo: any,
		resolution: any,
		onRealtimeCallback: any,
		subscriberUID: any,
		onResetCacheNeededCallback: any,
	) => {
		console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
		subscribeOnStream(
			symbolInfo,
			resolution,
			onRealtimeCallback,
			subscriberUID,
			onResetCacheNeededCallback,
			lastBarsCache.get(symbolInfo.full_name),
		);
	},

	unsubscribeBars: (subscriberUID: any) => {
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		unsubscribeFromStream(subscriberUID);
	},
};
