// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token in Account Info and set the environment variables.
// See http://twil.io/secure
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendOTP = (code, receiver) => {
    client.messages
        .create({ body: `PHÒNG TRỌ 123 - Your code: ${code}`, from: process.env.TWILIO_PHONE_NUMBER, to: receiver })
        .then(message => console.log(message.status))
        .catch(err => console.log(err))
}

export default sendOTP