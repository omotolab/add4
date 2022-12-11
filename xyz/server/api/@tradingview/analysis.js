/*
  ./tests/analysis.js
  Search for Bitcoin and get the Technical Analysis in all timeframes
*/
import marketAPI from '@mathieuc/tradingview'
export default function (req, res, next) {
    // req is the Node.js http request object
    // console.log(req.url)

    (async () => {
    const market = marketAPI(false);

    const searchBTC = (await market.search('bitcoin euro', 'crypto'))[0];
    console.log('Found Bitcoin / Euro:', searchBTC);

    const TA = await searchBTC.getTA();
    console.log('Full technical analysis for Bitcoin:', TA);

    // You can also use this way: await market.getTA('crypto', 'BINANCE:BTCEUR');
    })();

    // res is the Node.js http response object
  
    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    next()
}