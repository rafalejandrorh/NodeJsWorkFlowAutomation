const { 
    telegram: { bot: { replySettingsDefault } }, 
    regExp: { amount: regExpAmount } 
} = require('../../../config');

const { logErrors } = require('../middlewares/error.handler');

const DollarService = require('../services/dollar.service');

const service = new DollarService();

module.exports = (bot) => bot.command(['calculatePaypalFees', 'calculatepaypalfees'], async (context) => {

    try {

        amount = 0;
        payload = context.payload;
        if(payload) {
            console.log(payload);
            payloadSplit = payload.split(' ');
            payloadSplit.forEach(value => {
                if(regExpAmount.test(value)) {
                    amount = value;
                }
            });
            console.log('amount: ', amount);

            if(amount === 0) {
                throw new Error('Missing Parameters');
            }

            reply = await service.calculatePaypalFees(amount);
            console.log('response calculatePaypalFees: ', reply);
            context.reply(reply, replySettingsDefault);
        }else{
            throw new Error('Missing Parameters');
        }
    } catch (error) {
        logErrors(context, error);
    }
});