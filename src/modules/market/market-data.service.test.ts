import axios from 'axios';
import { MarketDataService } from './market-data.service';
import { BinanceKline } from './market-data.types';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MarketDataService', () => {
  let marketDataService: MarketDataService;

  beforeEach(() => {
    marketDataService = new MarketDataService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchHistoricalMarketData', () => {
    it('should fetch historical market data from Binance', async () => {
      const symbol = 'BTCUSDT';
      const startTime = 1622505600000;
      const endTime = 1622592000000;

      const mockedResponse: BinanceKline[] = [
        [
          startTime,
          '10000',
          '10100',
          '9900',
          '10050',
          '123',
          endTime,
          '2000',
          123,
          '10000',
          '10000',
          '0',
        ],
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockedResponse });

      const result = await marketDataService.fetchHistoricalMarketData(symbol, startTime, endTime);

      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.binance.com/api/v3/klines', {
        params: {
          symbol,
          interval: '1h',
          startTime,
          endTime,
        },
      });

      expect(result).toEqual(mockedResponse);
    });
  });

  describe('analyzePriceChanges', () => {
    it('should identify price increases and decreases', () => {
      const mockedKlineData: BinanceKline[] = [
        [
          1622505600000,
          '10000', // open
          '10100', // high
          '9900', // low
          '10050', // close
          '123',
          1622510000000,
          '200000',
          123,
          '100000',
          '100000',
          '0',
        ],
        [
          1622519200000,
          '10050', // open
          '10200', // high
          '9950', // low
          '10000', // close
          '234',
          1622510000000,
          '200000',
          123,
          '100000',
          '100000',
          '0',
        ],
        [
          1622532800000,
          '10100', // open
          '10300', // high
          '10000', // low
          '10250', // close
          '345',
          1622510000000,
          '200000',
          123,
          '100000',
          '100000',
          '0',
        ],
        [
          1622532900000,
          '10100', // open
          '10300', // high
          '10000', // low
          '10250', // close
          '345',
          1622510000000,
          '200000',
          123,
          '100000',
          '100000',
          '0',
        ],
      ];
      const result = marketDataService.analyzePriceChange(mockedKlineData);

      expect(result).toEqual([
        { time: 1622505600000, priceChange: 'Initial', close: 10050 },
        { time: 1622519200000, priceChange: 'Decrease', close: 10000 },
        { time: 1622532800000, priceChange: 'Increase', close: 10250 },
        { time: 1622532900000, priceChange: 'No Change', close: 10250 },
      ]);
    });
  });
});
