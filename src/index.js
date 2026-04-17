"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const zod_1 = require("zod");
const tools_js_1 = require("./tools.js");
const server = new index_js_1.Server({
    name: "crypto-trading-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
/**
 * List available tools.
 */
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
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
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case "get_ticker":
                return await (0, tools_js_1.getTicker)(args);
            case "get_ohlcv":
                return await (0, tools_js_1.getOHLCV)(args);
            case "get_order_book":
                return await (0, tools_js_1.getOrderBook)(args);
            case "calculate_indicators":
                return await (0, tools_js_1.calculateIndicators)(args);
            case "get_account_info":
                return await (0, tools_js_1.getAccountInfo)();
            case "execute_order":
                return await (0, tools_js_1.executeOrder)(args);
            default:
                throw new Error(`Tool not found: ${name}`);
        }
    }
    catch (error) {
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
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("Crypto Trading MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map