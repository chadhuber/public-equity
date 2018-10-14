module.exports = (req, res) => {

	var stripe = require("stripe")("dRzTYcjUsjoOQqZ2VlfLCV3opTtR5zOV");

	const token = req.body.stripeToken;

	const charge = stripe.charges.create({
	  amount: req.body.amount,
	  currency: 'usd',
	  source: token
	});

  res.sendStatus(200);
}