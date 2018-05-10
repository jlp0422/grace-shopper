const emailRegex = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
const passwordRegexMedium = RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const passwordRegexStrong = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production' ? 'http://myapidomain.com' : 'http://localhost:3000';
const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production' ? 'pk_live_MY_PUBLISHABLE_KEY' : 'pk_test_MY_PUBLISHABLE_KEY';

module.exports = {
  emailRegex,
  passwordRegexMedium,
  passwordRegexStrong,
  PAYMENT_SERVER_URL,
  STRIPE_PUBLISHABLE
}
