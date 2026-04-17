/**
 * Public Data Tools
 */
export declare function getTicker({ symbol }: {
    symbol: string;
}): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function getOHLCV({ symbol, timeframe, limit }: {
    symbol: string;
    timeframe?: string;
    limit?: number;
}): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function getOrderBook({ symbol, limit }: {
    symbol: string;
    limit?: number;
}): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
/**
 * Technical Indicator Tools
 */
export declare function calculateIndicators({ symbol, indicators }: {
    symbol: string;
    indicators: any[];
}): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
/**
 * Private Trading Tools (Requires API Keys)
 */
export declare function getAccountInfo(): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function executeOrder({ symbol, side, type, amount, price }: {
    symbol: string;
    side: "buy" | "sell";
    type: "market" | "limit";
    amount: number;
    price?: number;
}): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=tools.d.ts.map