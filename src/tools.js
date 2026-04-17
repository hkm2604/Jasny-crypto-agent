"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicker = getTicker;
exports.getOHLCV = getOHLCV;
exports.getOrderBook = getOrderBook;
exports.calculateIndicators = calculateIndicators;
exports.getAccountInfo = getAccountInfo;
exports.executeOrder = executeOrder;
const ccxt_1 = __importDefault(require("ccxt"));
const technicalindicators_1 = require("technicalindicators");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize exchange (Binance by default)
const exchange = new ccxt_1.default.binance({
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_SECRET,
    enableRateLimit: true,
});
/**
 * Public Data Tools
 */
async function getTicker({ symbol }) {
    const ticker = await exchange.fetchTicker(symbol);
    return {
        content: [{ type: "text", text: JSON.stringify(ticker, null, 2) }],
    };
}
async function getOHLCV({ symbol, timeframe = "1h", limit = 100 }) {
    const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
    return {
        content: [{ type: "text", text: JSON.stringify(ohlcv, null, 2) }],
    };
}
async function getOrderBook({ symbol, limit = 20 }) {
    const orderBook = await exchange.fetchOrderBook(symbol, limit);
    return {
        content: [{ type: "text", text: JSON.stringify(orderBook, null, 2) }],
    };
}
/**
 * Technical Indicator Tools
 */
async function calculateIndicators({ symbol, indicators }) {
    // Fetch enough data for calculations (default 100 periods)
    const ohlcv = await exchange.fetchOHLCV(symbol, "1h", undefined, 100);
    const closes = ohlcv.map((d) => d[4]);
    const results = {};
    for (const ind of indicators) {
        const period = ind.period || 14;
        switch (ind.name) {
            case "RSI":
                results.RSI = technicalindicators_1.RSI.calculate({ values: closes, period });
                break;
            case "SMA":
                results.SMA = technicalindicators_1.SMA.calculate({ values: closes, period });
                break;
            case "EMA":
                results.EMA = technicalindicators_1.EMA.calculate({ values: closes, period });
                break;
            case "MACD":
                results.MACD = technicalindicators_1.MACD.calculate({
                    values: closes,
                    fastPeriod: 12,
                    slowPeriod: 26,
                    signalPeriod: 9,
                    SimpleMAOscillator: false,
                    SimpleMASignal: false,
                });
                break;
            case "BBANDS":
                results.BBANDS = technicalindicators_1.BollingerBands.calculate({ values: closes, period, stdDev: 2 });
                break;
        }
    }
    // Return only the last few values to keep payload small
    const sanitizedResults = {};
    for (const key in results) {
        sanitizedResults[key] = results[key].slice(-5);
    }
    return {
        content: [{ type: "text", text: JSON.stringify(sanitizedResults, null, 2) }],
    };
}
/**
 * Private Trading Tools (Requires API Keys)
 */
async function getAccountInfo() {
    if (!exchange.apiKey || !exchange.secret) {
        throw new Error("API Keys not configured. Please add BINANCE_API_KEY and BINANCE_SECRET to .env file.");
    }
    const balance = await exchange.fetchBalance();
    return {
        content: [{ type: "text", text: JSON.stringify(balance.total, null, 2) }],
    };
}
async function executeOrder({ symbol, side, type, amount, price }) {
    if (!exchange.apiKey || !exchange.secret) {
        throw new Error("API Keys not configured. Please add BINANCE_API_KEY and BINANCE_SECRET to .env file.");
    }
    // Safety check: Don't execute real trades unless explicitly confirmed (future safety)
    // For now, we attempt to call the exchange.
    let order;
    if (type === "market") {
        order = await exchange.createOrder(symbol, type, side, amount);
    }
    else {
        order = await exchange.createOrder(symbol, type, side, amount, price);
    }
    return {
        content: [{ type: "text", text: JSON.stringify(order, null, 2) }],
    };
}
//# sourceMappingURL=tools.js.map