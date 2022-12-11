import { createMollieClient } from '@mollie/api-client';

const plans = {
    'unlimited-month': {
        amount: {
            value:    '100.00',
            currency: 'EUR'
        }
    },
    'unlimited-week': {
        amount: {
            value:    '25.00',
            currency: 'EUR'
        }
    },
    'unlimited-day': {
        amount: {
            value:    '5.00',
            currency: 'EUR'
        }
    }
}
export default defineEventHandler(async (event) => {
    const started = Date.now()
    const { plan, redirectUrl } = await useBody(event)
    const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_KEY });
    const paymentOptions = {
        amount: plans[plan.name].amount,
        description: 'onceupon.ai',
        redirectUrl
        // webhookUrl:  'https://yourwebshop.example.org/webhook'
    }
    const payment = await mollieClient.payments.create(paymentOptions);

    return { started, payment, finished: Date.now() }

})
