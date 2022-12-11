/*
  ./tests/indicator.js
  Get indicator values
*/
import marketAPI from '@mathieuc/tradingview'
export default function (req, res, next) {
    // req is the Node.js http request object
    // console.log(req.url)

    const market = marketAPI(false); // 'false' for chart-only mode

    market.on('logged', () => {
    market.initChart({
        symbol: 'COINBASE:BTCEUR',
        period: '240',
        range: 50,
        indicators: [
        { name: 'ACCU_DISTRIB', id: 'STD;Accumulation_Distribution', version: '25' },
        { name: 'CIPHER_A', id: 'PUB;vrOJcNRPULteowIsuP6iHn3GIxBJdXwT', version: '1.0' },
        { name: 'CIPHER_B', id: 'PUB;uA35GeckoTA2EfgI63SD2WCSmca4njxp', version: '15.0' },
        // Color Changing moving average
        { name: 'CCMA', id: 'PUB;5nawr3gCESvSHQfOhrLPqQqT4zM23w3X', version: '6.0' },
        ],
    }, (periods) => {
        if (!periods[0].CIPHER_B) return;
        if (!periods[0].CCMA) return;

        console.log('Last period:', {
        price: periods[0].$prices.close,
        moneyFlow: (periods[0].CIPHER_B.RSIMFIArea >= 0) ? 'POSITIVE' : 'NEGATIVE',
        VWAP: periods[0].CIPHER_B.VWAP,
        MA: (periods[0].CCMA.Plot <= periods[0].$prices.close) ? 'ABOVE' : 'UNDER',
        });
    });
    });


    // res is the Node.js http response object
  
    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    next()
}