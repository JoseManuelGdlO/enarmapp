const stripe = require('stripe')('sk_test_51QQZg2GHbhGIsNn3Mh4N85UfYnsMFERvlubwSvdCHZuBcorhXhOoepd7eUMkkAkMx1eLzRxINNtqnLoWNM6fRhvg00kvL00nK7');

const vouchersModel = require('../storage/models/voucher.model');
const userStatus = require("../storage/models/user_status.model.js");
const transactionModel = require("../storage/models/transaction.model.js");

async function pay(subscription, token, coupon, userId) {

  let price = subscription.price;

  if (coupon) {

    const expiration = new Date(coupon.expiration_date);
    const today = new Date();
    if (expiration < today) {
      const errorCoupon = 'Cupón expirado';
      return { message: errorCoupon, pay: false };
    }

    const usageCount = coupon.usage_count;
    const usageLimit = coupon.usage_limit;
    if (usageCount >= usageLimit) {
      const errorCoupon = 'Cupón agotado';
      return { message: errorCoupon, pay: false };
    }

    if (coupon.type === 'percentage') {
      price = price - (price * coupon.discount / 100);
    } else {
      price = price - coupon.discount;
    }

  }

  try {
    await stripe.charges.create({
      amount: price * 100 , // Monto en centavos (ej. 1000 para $10.00)
      currency: 'mxn', // O la moneda que desees
      source: token,   // Token recibido del frontend
      description: `${subscription.description}${coupon ? ` con cupón ${coupon.name}` : ''}`,
    });

    if(coupon){
      await vouchersModel.update({
        usage_count: coupon.usage_count + 1
      }, {
        where: {
          id: coupon.id
        }
      });
    }

    await userStatus.update({
      name: 1
    }, {
      where: {
        user_id: userId
      }
    });

    let month_duration = subscription.month_duration;
    let date = new Date();
    date.setMonth(date.getMonth() + month_duration);

    await transactionModel.create({
      user_id: userId,
      transaction_date: new Date(),
      amount: price,
      finished_date: date,
    });

    return { message: 'Pago exitoso', pay: true };
  } catch (error) {
    return { message: error.message, pay: false };
  }
}

module.exports = {
  pay
}