const sdk = require('api')('@edgeimpulse/v1.5#6wkk1tkwuy91e9');

sdk.getDspConfig({projectId: 'projectId', dspId: 'dspId'})
  .then(res => console.log(res))
  .catch(err => console.error(err));