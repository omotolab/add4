/*
  ./tests/prices.js
  Search for Bitcoin and Ethereum and get real time prices
*/
import marketAPI from '@mathieuc/tradingview'
const market = marketAPI();

/* export default function (req, res, next) {
    // req is the Node.js http request object
    // console.log(req.url)

    (async () => {
    const market = marketAPI();

    market.on('logged', async () => {
        console.log('API LOGGED');

        const searchBTC = (await market.search('bitcoin euro', 'crypto'))[1
        ];
        // res.send({ data: searchBTC[0] })
        console.log('Found Bitcoin / Euro:', searchBTC, res);

        market.subscribe(searchBTC.id);
    });

    market.on('price', (data) => {
        console.log(data.symbol, '=>', data.price);
        return data
    });

    const searchETH = (await market.search('ethereum euro', 'crypto'))[1];
    // res.send({ data: searchETH[0] })
    console.log('Found Ethereum / Euro:', searchETH, res);

    setTimeout(() => {
        console.log('Subscribe to', searchETH.id);
        market.subscribe(searchETH.id);
    }, 1000);

    setTimeout(() => {
        console.log('Unsubscribe from', searchETH.id);
        market.unsubscribe(searchETH.id);
    }, 20000);
    })();

    // res is the Node.js http response object
  
    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    next()
} */
export default (req, res) => {
    market.on('logged', async () => {
        console.log('API LOGGED');

        const searchBTC = (await market.search('bitcoin euro', 'crypto'))[1
        ];
        // res.send({ data: searchBTC[0] })
        console.log('Found Bitcoin / Euro:', searchBTC, res);

        market.subscribe(searchBTC.id);
    });
    
    market.on('logged', async () => {
        console.log('API LOGGED');
    
        const searchBTC = (await market.search('bitcoin euro', 'crypto'))[1
        ];
        // res.send({ data: searchBTC[0] })
        console.log('Found Bitcoin / Euro:', searchBTC, res);
    
        market.subscribe(searchBTC.id);
    });
    return 'Hello World Works'
}