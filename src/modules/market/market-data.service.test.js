"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const market_data_service_1 = require("./market-data.service");
jest.mock('axios');
const mockedAxios = axios_1.default;
describe('MarketDataService', () => {
    let marketDataService;
    beforeEach(() => {
        marketDataService = new market_data_service_1.MarketDataService();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('fetchHistoricalMarketData', () => {
        it('should fetch historical market data from Binance', () => __awaiter(void 0, void 0, void 0, function* () {
            const symbol = 'BTCUSDT';
            const startTime = 1622505600000;
            const endTime = 1622592000000;
            const mockedResponse = [
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
            const result = yield marketDataService.fetchHistoricalMarketData(symbol, startTime, endTime);
            expect(mockedAxios.get).toHaveBeenCalledWith('https://api.binance.com/api/v3/klines', {
                params: {
                    symbol,
                    interval: '1h',
                    startTime,
                    endTime,
                },
            });
            expect(result).toEqual(mockedResponse);
        }));
    });
    describe('analyzePriceChanges', () => {
        it('should identify price increases and decreases', () => {
            const mockedKlineData = [
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
