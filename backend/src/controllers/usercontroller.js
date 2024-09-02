const db = require('../config/db.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/env');

const User = db.user;

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.send({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).send({ message: "Fail! Error -> " + err.message });
    }
};


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({ message: 'User Not Found.' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
        }


        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        const { password: _, ...userWithoutPassword } = user.toJSON();
        res.json({ user: userWithoutPassword, token });
    } catch (err) {
        res.status(500).send({ message: 'Error -> ' + err.message });
    }
};
