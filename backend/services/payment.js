const stripe = require('stripe')('tu_clave_secreta_stripe');

async function createSession(amount, currency) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
          payment_method_types: ['card'],
        });
    
        res.status(200).send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
}

module.exports = {
    createSession
}