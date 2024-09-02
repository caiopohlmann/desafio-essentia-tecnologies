const jwt = require('jsonwebtoken');
const config = require('../config/env.js');

exports.validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send({ auth: false, message: 'Authorization header is missing.' });
    }

    const token = authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(401).send({ auth: false, message: 'Token is missing.' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        
        req.userId = decoded.id;
        next();
    });
};
