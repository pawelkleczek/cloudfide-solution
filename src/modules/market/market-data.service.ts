import axios from 'axios';
import { AnalyzedPriceChange, BinanceKline, PriceChangeType } from './market-data.types';

const BINANCE_API_URL = process.env.BINANCE_API_URL || 'https://api.binance.com';

export class MarketDataService {
  constructor() {
    console.log('MarketDataService created');
  }

  public async fetchHistoricalMarketData(
    symbol: string,
    startTime: number,
    endTime: number,
  ): Promise<BinanceKline[]> {
    try {
      const response = await axios.get(`${BINANCE_API_URL}/api/v3/klines`, {
        params: {
          symbol,
          interval: '1h', // @todo: create enum
          startTime,
          endTime,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Failed to fetch historical market data');
      throw error;
    }
  }

  public analyzePriceChange(klineData: BinanceKline[]): AnalyzedPriceChange[] {
    const results: AnalyzedPriceChange[] = [];

    for (let i = 0; i < klineData.length; i++) {
      const closePrice = parseFloat(klineData[i][4]);

      if (i === 0) {
        results.push({
          time: klineData[i][0],
          priceChange: 'Initial',
          close: closePrice,
        });
        continue;
      }

      const prevClose = parseFloat(klineData[i - 1][4]);

      let change: PriceChangeType = 'No Change';

      if (closePrice > prevClose) change = 'Increase';
      else if (closePrice < prevClose) change = 'Decrease';

      results.push({
        time: klineData[i][0],
        priceChange: change,
        close: closePrice,
      });
    }

    return results;
  }
}
