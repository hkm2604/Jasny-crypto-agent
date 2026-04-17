import { getTicker, getOHLCV, calculateIndicators, getOrderBook } from "./src/tools.js";

async function testAll() {
  console.log("🚀 Memulakan ujian untuk Crypto Agent Tools...");
  const symbol = "BTC/USDT";

  try {
    // 1. Test getTicker
    console.log(`\n1. Testing getTicker for ${symbol}...`);
    const ticker = await getTicker({ symbol });
    const tickerData = JSON.parse(ticker.content[0].text);
    console.log(`✅ Success! Price: ${tickerData.last}`);

    // 2. Test getOHLCV
    console.log(`\n2. Testing getOHLCV for ${symbol}...`);
    const ohlcv = await getOHLCV({ symbol, limit: 5 });
    const ohlcvData = JSON.parse(ohlcv.content[0].text);
    console.log(`✅ Success! Received ${ohlcvData.length} candles.`);

    // 3. Test getOrderBook
    console.log(`\n3. Testing getOrderBook for ${symbol}...`);
    const ob = await getOrderBook({ symbol, limit: 5 });
    const obData = JSON.parse(ob.content[0].text);
    console.log(`✅ Success! Bids: ${obData.bids.length}, Asks: ${obData.asks.length}`);

    // 4. Test calculateIndicators (RSI, SMA)
    console.log(`\n4. Testing calculateIndicators for ${symbol}...`);
    const indicators = await calculateIndicators({
      symbol,
      indicators: [
        { name: "RSI", period: 14 },
        { name: "SMA", period: 20 },
      ],
    });
    const indicatorData = JSON.parse(indicators.content[0].text);
    console.log("✅ Success! Indicator results:");
    console.log(`   RSI: ${indicatorData.RSI[indicatorData.RSI.length - 1]}`);
    console.log(`   SMA: ${indicatorData.SMA[indicatorData.SMA.length - 1]}`);

    console.log("\n✨ Semua ujian 'Public Data' BERJAYA!");
  } catch (error) {
    console.error("❌ Ralat semasa ujian:", error);
  }
}

testAll();
