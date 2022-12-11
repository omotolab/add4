const crypto = require("crypto-js");

const signRequest = (request, apiKey, apiSecret) => {
  const { id, method, params, nonce } = request;

  const paramsString =
    params == null
      ? ""
      : Object.keys(params)
          .sort()
          .reduce((a, b) => {
            return a + b + params[b];
          }, "");

  const sigPayload = method + id + apiKey + paramsString + nonce;

  request.sig = crypto
    .HmacSHA256(sigPayload, apiSecret)
    .toString(crypto.enc.Hex);

  return request;
};

const apiKey = "token"; /* User API Key */
const apiSecret = "secretKey"; /* User API Secret */

let request = {
  id: 11,
  method: "private/get-order-detail",
  api_key: API_KEY,
  params: {
    order_id: 53287421324
  },
  nonce: 1587846358253,
};

const requestBody = JSON.stringify(signRequest(request, apiKey, apiSecret)));