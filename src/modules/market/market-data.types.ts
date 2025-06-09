export type BinanceKline = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Unused field, ignore.
];

export type PriceChangeType = 'Increase' | 'Decrease' | 'No Change' | 'Initial';

export interface AnalyzedPriceChange {
  time: number;
  priceChange: PriceChangeType;
  close: number;
}
