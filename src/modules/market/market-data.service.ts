export class MarketDataService {
  constructor() {
    console.log('MarketDataService created');
  }

  public async fetchHistoricalMarketData(symbol: string, startTime: number, endTime: number) {
    console.log(`Fetching historical market data for ${symbol} from ${startTime} to ${endTime}`);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  public analyzePriceChange(data: any[]) {
    console.log('Analyzing price changes...');
    return [];
  }
}
