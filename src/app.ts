import express from 'express';

import { MarketDataService } from './modules/market/market-data.service';

const ONE_DAY_AGO_IN_MS = 86_400_000;

const app = express();

const v1 = express.Router();

const marketDataService = new MarketDataService();

v1.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

v1.get('/market-data/analyze', async (req, res) => {
  const symbol = (req.query.symbol as string) || 'BTCUSDT';
  const startTime = parseInt(req.query.startTime as string) || Date.now() - ONE_DAY_AGO_IN_MS;
  const endTime = parseInt(req.query.endTime as string) || Date.now();

  try {
    const marketData = await marketDataService.fetchHistoricalMarketData(
      symbol,
      startTime,
      endTime,
    );
    const analysis = marketDataService.analyzePriceChange(marketData);
    res.json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

app.use('/api/v1', v1);

export default app;
