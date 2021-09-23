import paypal from '@paypal/checkout-server-sdk';
 
let clientId = 'AUrgJYUp1-ESCbXlPWTHzViQIwYevJSGTR9ZlRx5Nbk3_9d6KBlRzFHJGzXJSJo0N6ELJoCgJe7fsi_L';
let clientSecret = 'EEFgMQP3a5ox-nQ6knD80Q-q-jIFTyK8lccGF-Ik893qHrzEKVPrUCuzyTbk3ucLS6n-Oqg38pd0ciGO';

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);
let request;

export const createOrder  = async function(price, currency) {
    request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": currency,
                    "value": `${price}`
                },
                // "payee": {
                //     "email_address": "sb-0tbrl7596378@personal.example.com"
                // }
            }
         ]
    });
    let response = await client.execute(request);
   return response.result.id;
}

export const captureOrder =  async function(orderId) {
    request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    let response = await client.execute(request);
    return response.result;
}