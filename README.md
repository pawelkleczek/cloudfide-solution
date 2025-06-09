Binance Market Data Analyzer

This project is a simple Node.js API that fetches and alayzes historical market data from the Binance cryptocurrency exchange. It uses Express and Typescript, with Jest for unit testing.

Features:

- Fetch historical data for a specific cryptocurrency symbol and time range.
- Analyze price changes between concecutive candles.
- Returns an array of analyzed results (time, price change, close price).
- Handles errors for failed API requests.
- Includes unit tests for both API calls and price analysis logic.

Getting Started:

1. Clone repository:
```bash
git clone <repo-url>
cd <project-folder>
```
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:
	Create .env file based on .env.example
	Default envs should suffice.
4. Run the app:
```bash
npm run dev
```

API endpoints:
```
GET /api/v1/market-data/analyze?symbol=ETHBTC&startTime=<timestamp>&endTime=<timestamp> Fetches historical market data and analyzes price changes.
```

Testing:
Run unit tests with:
```bash
npm run test
```

Next steps / Future improvements:
* Add support for dynamic candle intervals (1m, 5m, 1h, etc.)
* Enhance the analysis logic to calculate percentage change
* Add rate limiting and error handling for API usage
* Add Swagger or similar API documentation
* Add integration tests with mocked API responses
* Add support for user authentication if needed
