const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyJwt = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(400).send({ message: 'unauthorized access' });
		}
		const token = req.headers.authorization.split(' ')[1];
		const decodedUser = jwt.verify(token, 'secretkey');
		const user = await User.findById(decodedUser._id);
		if (!user) {
			return res.status(401).send({ message: 'unauthorized access' });
		}
		req.user = user;
		next();
	} catch (err) {
		return res.status(401).send({ message: 'invalid token , may be it expired.' });
	}
};

module.exports = verifyJwt;
