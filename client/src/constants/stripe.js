const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_L5BNU52HtQupz1A0XX4pzElV';

export default STRIPE_PUBLISHABLE;
