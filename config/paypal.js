import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';

dotenv.config();
 
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

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