#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import {
  getTicker,
  getOHLCV,
  getOrderBook,
  getAccountInfo,
  executeOrder,
  calculateIndicators,
  fetchNews,
  getMarketBehavior,
} from "./tools.js";

const server = new Server(
  {
    name: "crypto-trading-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * List available tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_ticker",
        description: "Get real-time price and 24h stats for a symbol (e.g., BTC/USDT).",
        inputSchema: {
          type: "object",
          properties: {
            symbol: { type: "string", description: "The symbol to fetch (e.g., BTC/USDT)" },
          },
          required: ["symbol"],
        },
      },
      {
        name: "get_ohlcv",
        description: "Fetch historical price data (Open, High, Low, Close, Volume).",
        inputSchema: {
          type: "object",
          properties: {
            symbol: { type: "string" },
            timeframe: { type: "string", enum: ["1m", "5m", "15m", "1h", "4h", "1d"], default: "1h" },
            limit: { type: "number", default: 100 },
          },
          required: ["symbol"],
        },
      },
      {
        name: "get_order_book",
        description: "Fetch market depth (Bids and Asks).",
        inputSchema: {
          type: "object",
          properties: {
            symbol: { type: "string" },
            limit: { type: "number", default: 20 },
          },
          required: ["symbol"],
        },
      },
      {
        name: "calculate_indicators",
        description: "Calculate technical indicators (RSI, SMA, EMA, MACD, Bollinger Bands).",
        inputSchema: {
          type: "object",
          properties: {
            symbol: { type: "string" },
            indicators: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", enum: ["RSI", "SMA", "EMA", "MACD", "BBANDS"] },
                  period: { type: "number" },
                },
                required: ["name"],
              },
            },
          },
          required: ["symbol", "indicators"],
        },
      },
      {
        name: "fetch_news",
        description: "Fetch high-impact trading news for a specific coin or the general market.",
        inputSchema: {
          type: "object",
          properties: {
            symbol: { type: "string" },
            days: { type: "number", default: 7 },
          },
        },
      },
      {
        name: "get_market_behavior",
        description: "Analyze price and volume behavior over the last 30 days to identify potential.",
        inputSchema: {
          type: "object",
          properties: {
            symbol: { type: "string" },
            days: { type: "number", default: 30 },
          },
          required: ["symbol"],
        },
      },
      {
        name: "get_account_info",
        description: "Get account balance and open positions (Requires API Keys).",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "execute_order",
        description: "Execute a buy or sell order (Requires API Keys).",
        inputSchema: {
          type: "object",
          properties: {
            symbol: { type: "string" },
            side: { type: "string", enum: ["buy", "sell"] },
            type: { type: "string", enum: ["market", "limit"] },
            amount: { type: "number" },
            price: { type: "number" },
          },
          required: ["symbol", "side", "type", "amount"],
        },
      },
    ],
  };
});

/**
 * Handle tool calls.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "get_ticker":
        return await getTicker(args as any);
      case "get_ohlcv":
        return await getOHLCV(args as any);
      case "get_order_book":
        return await getOrderBook(args as any);
      case "calculate_indicators":
        return await calculateIndicators(args as any);
      case "fetch_news":
        return await fetchNews(args as any);
      case "get_market_behavior":
        return await getMarketBehavior(args as any);
      case "get_account_info":
        return await getAccountInfo();
      case "execute_order":
        return await executeOrder(args as any);
      default:
        throw new Error(`Tool not found: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
      isError: true,
    };
  }
});

/**
 * Start the server.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Crypto Trading MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
