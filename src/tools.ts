import ccxt from "ccxt";
import { RSI, SMA, EMA, MACD, BollingerBands } from "technicalindicators";
import dotenv from "dotenv";

dotenv.config();

// Initialize exchange (Bybit)
const exchange = new ccxt.bybit({
  apiKey: process.env.BYBIT_API_KEY || "",
  secret: process.env.BYBIT_SECRET || "",
  enableRateLimit: true,
});

/**
 * Public Data Tools
 */

export async function getTicker({ symbol }: { symbol: string }) {
  const ticker = await exchange.fetchTicker(symbol);
  return {
    content: [{ type: "text", text: JSON.stringify(ticker, null, 2) }],
  };
}

export async function getOHLCV({ symbol, timeframe = "1h", limit = 100 }: { symbol: string; timeframe?: string; limit?: number }) {
  const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
  return {
    content: [{ type: "text", text: JSON.stringify(ohlcv, null, 2) }],
  };
}

export async function getOrderBook({ symbol, limit = 20 }: { symbol: string; limit?: number }) {
  const orderBook = await exchange.fetchOrderBook(symbol, limit);
  return {
    content: [{ type: "text", text: JSON.stringify(orderBook, null, 2) }],
  };
}

/**
 * Technical Indicator Tools
 */

export async function calculateIndicators({ symbol, indicators }: { symbol: string; indicators: any[] }) {
  // Fetch enough data for calculations (default 100 periods)
  const ohlcv = await exchange.fetchOHLCV(symbol, "1h", undefined, 100);
  const closes = ohlcv.map((d: any) => d[4]);

  const results: any = {};

  for (const ind of indicators) {
    const period = ind.period || 14;
    switch (ind.name) {
      case "RSI":
        results.RSI = RSI.calculate({ values: closes, period });
        break;
      case "SMA":
        results.SMA = SMA.calculate({ values: closes, period });
        break;
      case "EMA":
        results.EMA = EMA.calculate({ values: closes, period });
        break;
      case "MACD":
        results.MACD = MACD.calculate({
          values: closes,
          fastPeriod: 12,
          slowPeriod: 26,
          signalPeriod: 9,
          SimpleMAOscillator: false,
          SimpleMASignal: false,
        });
        break;
      case "BBANDS":
        results.BBANDS = BollingerBands.calculate({ values: closes, period, stdDev: 2 });
        break;
    }
  }

  // Return only the last few values to keep payload small
  const sanitizedResults: any = {};
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

export async function getAccountInfo() {
  if (!exchange.apiKey || !exchange.secret) {
    throw new Error("API Keys not configured. Please add BYBIT_API_KEY and BYBIT_SECRET to .env file.");
  }
  const balance = await exchange.fetchBalance();
  return {
    content: [{ type: "text", text: JSON.stringify(balance.total, null, 2) }],
  };
}

export async function executeOrder({ symbol, side, type, amount, price }: { symbol: string; side: "buy" | "sell"; type: "market" | "limit"; amount: number; price?: number }) {
  if (!exchange.apiKey || !exchange.secret) {
    throw new Error("API Keys not configured. Please add BYBIT_API_KEY and BYBIT_SECRET to .env file.");
  }

  // Safety check: Don't execute real trades unless explicitly confirmed (future safety)
  // For now, we attempt to call the exchange.
  let order;
  if (type === "market") {
    order = await exchange.createOrder(symbol, type, side, amount);
  } else {
    order = await exchange.createOrder(symbol, type, side, amount, price);
  }

  return {
    content: [{ type: "text", text: JSON.stringify(order, null, 2) }],
  };
}

/**
 * Strategy Specific Tools
 */

export async function fetchNews({ symbol, days = 7 }: { symbol?: string; days?: number }) {
  // In a real scenario, this would hit Cryptopanic or a similar API.
  // For this implementation, we provide a placeholder that instructs the agent
  // to use its internal search capabilities if this tool is not connected to a live feed.
  // Note: Since I am an AI, I can also suggest the agent uses 'search_web' if available.
  return {
    content: [{ 
      type: "text", 
      text: `Sila gunakan keupayaan pencarian (search) anda untuk mencari berita utama bagi ${symbol || "pasaran crypto"} dalam tempoh ${days} hari lepas. Fokus pada sentimen (Bullish/Bearish) dan berita impak tinggi.` 
    }],
  };
}

export async function getMarketBehavior({ symbol, days = 30 }: { symbol: string; days?: number }) {
  const ohlcv = await exchange.fetchOHLCV(symbol, "1d", undefined, days);
  
  const closes = ohlcv.map((d: any) => d[4]);
  const volumes = ohlcv.map((d: any) => d[5]);
  
  const priceChange = ((closes[closes.length - 1] - closes[0]) / closes[0]) * 100;
  const avgVolume = volumes.reduce((a: number, b: number) => a + b, 0) / volumes.length;
  const maxPrice = Math.max(...closes);
  const minPrice = Math.min(...closes);
  const volatility = ((maxPrice - minPrice) / minPrice) * 100;

  const behaviorData = {
    symbol,
    period: `${days} days`,
    priceChangePct: priceChange.toFixed(2) + "%",
    avgVolume: avgVolume.toFixed(2),
    volatility: volatility.toFixed(2) + "%",
    lastPrice: closes[closes.length - 1],
    highestInPeriod: maxPrice,
    lowestInPeriod: minPrice,
  };

  return {
    content: [{ type: "text", text: JSON.stringify(behaviorData, null, 2) }],
  };
}
