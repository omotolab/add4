import Binance from 'binance-client'

export const publicClient = Binance()

// Authenticated client, can make signed calls
export const kukoinClient = Binance({
  apiKey: '0WJON6Ozu3t4evHUog',
  apiSecret: 'zFZG9PMQaMmAECUzAXTCs9z66AHcnqctyG2y',
})

export const binanceWatch = Binance({
  apiKey: '0CnCCAMmuUM2xppvsRiJ8v4XuKHgGiJ6ngyhQnDO4ljfttsxfpP5CptYCdneuVXW',
  apiSecret: 'WAQJtzJajCXzjfhyL20gH2nYGGDr9tlnBo9QR2SLvmlpIxLYCFb3r1q3JLTqrExQ',
})

export const binanceMatch = Binance({
  apiKey: 'LEoNFwlstEajexDF3Cg6iTOtdAjZInfSxE3KFPxRn4DWLDDlZNBl1bty7tjNd8UN',
  apiSecret: 'QAzc5KN7nfQUHITqihPaf4Xvr512plNWtOHu0lvnWNgdkwPdn7mjQgkMkEne5kA5',
})


publicClient.time().then(time => console.log(time))

export default publicClient
