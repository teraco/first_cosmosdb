require('dotenv').config();

const SENDGRID_API_KEY = process.env.MY_APIKEY;
const EMAIL = process.env.MY_EMAIL;

// 日付計算
const now = new Date();
const datetime = (now.getFullYear() + "-"  + (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes());

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);

// メインロジック

(async () => {

  // メール送信
  const msg = {
    to: EMAIL,
    from: EMAIL,
    subject: `[first_sendgrid]: ${datetime}`,
    html: `[first_sendgrid]: ${datetime}`,
  };
  sgMail.send(msg);

})(); // 最後の()は定義した関数の即時実行
